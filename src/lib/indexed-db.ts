// Sistema de almacenamiento con IndexedDB para mayor persistencia
const DB_NAME = "MathCardsDB"
const DB_VERSION = 1
const STORE_NAME = "userData"

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined' && typeof indexedDB !== 'undefined'

interface UserData {
  email: string
  password: string
  points: number
  gamesPlayed: number
  lastPlayed: string
  settings: {
    language: string
  }
}

class IndexedDBManager {
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    if (!isBrowser) {
      console.warn("[v0] IndexedDB: Not available in server environment")
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "email" })
        }
      }
    })
  }

  async saveUser(userData: UserData): Promise<void> {
    if (!isBrowser) {
      console.warn("[v0] IndexedDB: Not available in server environment")
      return Promise.resolve()
    }

    console.log("[v0] IndexedDB: Iniciando guardado de usuario:", userData.email)
    if (!this.db) {
      console.log("[v0] IndexedDB: Base de datos no inicializada, inicializando...")
      await this.init()
    }
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db!.transaction([STORE_NAME], "readwrite")
        const store = transaction.objectStore(STORE_NAME)
        const request = store.put(userData)

        request.onsuccess = () => {
          console.log("[v0] IndexedDB: Usuario guardado exitosamente")
          resolve()
        }
        request.onerror = () => {
          console.error("[v0] IndexedDB: Error en request:", request.error)
          reject(request.error)
        }
      } catch (error) {
        console.error("[v0] IndexedDB: Error al crear transacción:", error)
        reject(error)
      }
    })
  }

  async getUser(email: string): Promise<UserData | null> {
    if (!isBrowser) {
      console.warn("[v0] IndexedDB: Not available in server environment")
      return null
    }
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readonly")
      const store = transaction.objectStore(STORE_NAME)
      const request = store.get(email)

      request.onsuccess = () => resolve(request.result || null)
      request.onerror = () => reject(request.error)
    })
  }

  async getAllUsers(): Promise<UserData[]> {
    if (!isBrowser) {
      console.warn("[v0] IndexedDB: Not available in server environment")
      return []
    }
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readonly")
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async deleteUser(email: string): Promise<void> {
    if (!isBrowser) {
      console.warn("[v0] IndexedDB: Not available in server environment")
      return
    }
    if (!this.db) await this.init()
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readwrite")
      const store = transaction.objectStore(STORE_NAME)
      const request = store.delete(email)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  // Exportar todos los datos del usuario
  async exportUserData(email: string): Promise<string> {
    if (!isBrowser) {
      throw new Error("IndexedDB not available in server environment")
    }
    const userData = await this.getUser(email)
    if (!userData) throw new Error("Usuario no encontrado")

    const exportData = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      userData,
    }

    return JSON.stringify(exportData, null, 2)
  }

  // Importar datos del usuario
  async importUserData(jsonData: string): Promise<void> {
    if (!isBrowser) {
      throw new Error("IndexedDB not available in server environment")
    }
    try {
      const importData = JSON.parse(jsonData)
      if (!importData.userData || !importData.userData.email) {
        throw new Error("Formato de datos inválido")
      }

      await this.saveUser(importData.userData)
    } catch (error) {
      throw new Error("Error al importar datos: " + (error as Error).message)
    }
  }

  async getRegisteredEmails(): Promise<string[]> {
    if (!isBrowser) {
      console.warn("[v0] IndexedDB: Not available in server environment")
      return []
    }
    const users = await this.getAllUsers()
    return users.map((user) => user.email)
  }

  async isEmailRegistered(email: string): Promise<boolean> {
    if (!isBrowser) {
      console.warn("[v0] IndexedDB: Not available in server environment")
      return false
    }
    const user = await this.getUser(email)
    return user !== null
  }

  async exportEmailList(): Promise<string> {
    if (!isBrowser) {
      throw new Error("IndexedDB not available in server environment")
    }
    const emails = await this.getRegisteredEmails()
    const exportData = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      totalUsers: emails.length,
      emails: emails,
    }
    return JSON.stringify(exportData, null, 2)
  }
}

export const dbManager = new IndexedDBManager()
