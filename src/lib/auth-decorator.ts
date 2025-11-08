// Interfaz base para el componente de autenticación
export interface AuthComponent {
  register(email: string, password: string): Promise<AuthResult>
  login(email: string, password: string): Promise<AuthResult>
  logout(): void
  getCurrentUser(): User | null
  deleteUserAccount(email: string): boolean
}

export interface User {
  id: string
  email: string
  createdAt: string
}

export interface AuthResult {
  success: boolean
  message: string
  user?: User
}

// Implementación base del sistema de autenticación
class BaseAuthService implements AuthComponent {
  async register(email: string, password: string): Promise<AuthResult> {
    return {
      success: true,
      message: "Usuario registrado",
      user: { id: Date.now().toString(), email, createdAt: new Date().toISOString() },
    }
  }

  async login(email: string, password: string): Promise<AuthResult> {
    return {
      success: true,
      message: "Inicio de sesión exitoso",
      user: { id: Date.now().toString(), email, createdAt: new Date().toISOString() },
    }
  }

  logout(): void {
    // Implementación base
  }

  getCurrentUser(): User | null {
    return null
  }

  deleteUserAccount(email: string): boolean {
    return false // No implementado en la clase base
  }
}

// Decorator: Validación de Email
class EmailValidationDecorator implements AuthComponent {
  constructor(private wrapped: AuthComponent) {}

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  async register(email: string, password: string): Promise<AuthResult> {
    if (!this.validateEmail(email)) {
      return {
        success: false,
        message: "El formato del correo electrónico no es válido",
      }
    }
    return this.wrapped.register(email, password)
  }

  async login(email: string, password: string): Promise<AuthResult> {
    if (!this.validateEmail(email)) {
      return {
        success: false,
        message: "El formato del correo electrónico no es válido",
      }
    }
    return this.wrapped.login(email, password)
  }

  logout(): void {
    this.wrapped.logout()
  }

  getCurrentUser(): User | null {
    return this.wrapped.getCurrentUser()
  }

  deleteUserAccount(email: string): boolean {
    return this.wrapped.deleteUserAccount(email)
  }
}

// Decorator: Validación de Contraseña
class PasswordValidationDecorator implements AuthComponent {
  constructor(private wrapped: AuthComponent) {}

  private validatePassword(password: string): { valid: boolean; message: string } {
    if (password.length < 8) {
      return { valid: false, message: "La contraseña debe tener al menos 8 caracteres" }
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: "La contraseña debe contener al menos una mayúscula" }
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: "La contraseña debe contener al menos una minúscula" }
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: "La contraseña debe contener al menos un número" }
    }
    return { valid: true, message: "" }
  }

  async register(email: string, password: string): Promise<AuthResult> {
    const validation = this.validatePassword(password)
    if (!validation.valid) {
      return {
        success: false,
        message: validation.message,
      }
    }
    return this.wrapped.register(email, password)
  }

  async login(email: string, password: string): Promise<AuthResult> {
    return this.wrapped.login(email, password)
  }

  logout(): void {
    this.wrapped.logout()
  }

  getCurrentUser(): User | null {
    return this.wrapped.getCurrentUser()
  }

  deleteUserAccount(email: string): boolean {
    return this.wrapped.deleteUserAccount(email)
  }
}

// Decorator: Encriptación de Contraseñas usando Web Crypto API
class PasswordEncryptionDecorator implements AuthComponent {
  constructor(private wrapped: AuthComponent) {}

  private async hashPassword(password: string): Promise<string> {
    try {
      const cleanPassword = password.trim().normalize("NFC")
      const encoder = new TextEncoder()
      const data = encoder.encode(cleanPassword)
      const hashBuffer = await crypto.subtle.digest("SHA-256", data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashed = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
      return hashed
    } catch (error) {
      console.error("Error al encriptar contraseña:", error)
      throw new Error("Error al procesar la contraseña")
    }
  }

  async register(email: string, password: string): Promise<AuthResult> {
    try {
      const cleanPassword = password.trim()
      const hashedPassword = await this.hashPassword(cleanPassword)
      console.log("[v0] Registro - Password original:", cleanPassword)
      console.log("[v0] Registro - Password encriptado:", hashedPassword)
      return this.wrapped.register(email, hashedPassword)
    } catch (error) {
      return {
        success: false,
        message: "Error al procesar el registro. Intenta de nuevo.",
      }
    }
  }

  async login(email: string, password: string): Promise<AuthResult> {
    try {
      const cleanPassword = password.trim()
      const hashedPassword = await this.hashPassword(cleanPassword)
      console.log("[v0] Login - Password original:", cleanPassword)
      console.log("[v0] Login - Password encriptado:", hashedPassword)
      return this.wrapped.login(email, hashedPassword)
    } catch (error) {
      return {
        success: false,
        message: "Error al procesar el inicio de sesión. Intenta de nuevo.",
      }
    }
  }

  logout(): void {
    this.wrapped.logout()
  }

  getCurrentUser(): User | null {
    return this.wrapped.getCurrentUser()
  }

  deleteUserAccount(email: string): boolean {
    return this.wrapped.deleteUserAccount(email)
  }
}

// Decorator: Persistencia en LocalStorage
class LocalStorageDecorator implements AuthComponent {
  private dbManager: any

  constructor(
    private wrapped: AuthComponent,
    dbManager: any,
  ) {
    this.dbManager = dbManager
    this.dbManager
      .init()
      .then(() => {
        this.syncLocalStorageWithIndexedDB()
      })
      .catch(console.error)
  }

  private async syncLocalStorageWithIndexedDB() {
    try {
      const localUsers = this.getUsers()
      const dbUsers = await this.dbManager.getAllUsers()

      // Sincronizar usuarios de localStorage a IndexedDB si no existen
      for (const localUser of localUsers) {
        const existsInDB = dbUsers.some((u: any) => u.email === localUser.email)
        if (!existsInDB) {
          await this.dbManager.saveUser({
            email: localUser.email,
            password: localUser.password,
            points: 50,
            gamesPlayed: 0,
            lastPlayed: localUser.createdAt,
            settings: { language: "es" },
          })
        }
      }
    } catch (error) {
      console.error("Error al sincronizar datos:", error)
    }
  }

  private getUsers(): Array<{ email: string; password: string; id: string; createdAt: string }> {
    try {
      const users = localStorage.getItem("auth_users")
      return users ? JSON.parse(users) : []
    } catch (error) {
      console.error("Error al leer usuarios:", error)
      return []
    }
  }

  private saveUsers(users: Array<{ email: string; password: string; id: string; createdAt: string }>) {
    try {
      localStorage.setItem("auth_users", JSON.stringify(users))
      const emails = users.map((u) => u.email)
      localStorage.setItem("registered_emails", JSON.stringify(emails))
    } catch (error) {
      console.error("Error al guardar usuarios:", error)
      throw error
    }
  }

  async register(email: string, password: string): Promise<AuthResult> {
    try {
      const users = this.getUsers()
      console.log("[v0] Usuarios existentes antes de registrar:", users.length)

      if (users.some((u) => u.email === email)) {
        console.log("[v0] Error: Email ya registrado")
        return {
          success: false,
          message: "Este correo electrónico ya está registrado",
        }
      }

      const result = await this.wrapped.register(email, password)
      console.log("[v0] Resultado del registro base:", result)

      if (result.success && result.user) {
        const userData = {
          email: result.user.email,
          password: password,
          id: result.user.id,
          createdAt: result.user.createdAt,
        }

        console.log("[v0] Guardando usuario con password encriptado:", password)
        users.push(userData)
        console.log("[v0] Total de usuarios después de agregar:", users.length)

        this.saveUsers(users)
        console.log("[v0] Usuario guardado en localStorage exitosamente")

        // Verificar que se guardó correctamente
        const savedUsers = this.getUsers()
        console.log("[v0] Verificación: usuarios en localStorage:", savedUsers.length)
        console.log("[v0] Usuario guardado:", savedUsers.find((u) => u.email === email) ? "SÍ" : "NO")

        try {
          console.log("[v0] Intentando guardar en IndexedDB...")
          await this.dbManager.saveUser({
            email: result.user.email,
            password: password,
            points: 50,
            gamesPlayed: 0,
            lastPlayed: new Date().toISOString(),
            settings: { language: "es" },
          })
          console.log("[v0] Usuario guardado en IndexedDB exitosamente")
        } catch (dbError) {
          console.error("[v0] Error al guardar en IndexedDB:", dbError)
          // Continuar aunque falle IndexedDB, localStorage ya tiene los datos
        }

        localStorage.setItem("auth_current_user", JSON.stringify(result.user))
        console.log("[v0] Usuario actual establecido en localStorage")
      }

      return result
    } catch (error) {
      console.error("[v0] Error en registro:", error)
      return {
        success: false,
        message: "Error al guardar el usuario. Intenta de nuevo.",
      }
    }
  }

  async login(email: string, password: string): Promise<AuthResult> {
    try {
      const users = this.getUsers()
      console.log("[v0] Usuarios guardados:", users)
      console.log("[v0] Buscando usuario con email:", email)
      console.log("[v0] Password encriptado recibido:", password)

      const userExists = users.find((u) => u.email === email)

      if (!userExists) {
        console.log("[v0] Usuario no encontrado - no está registrado")
        return {
          success: false,
          message: "No existe una cuenta con este correo. Por favor regístrate primero.",
        }
      }

      const user = users.find((u) => u.email === email && u.password === password)

      if (!user) {
        console.log("[v0] Usuario encontrado pero password no coincide")
        return {
          success: false,
          message: "Contraseña incorrecta. Por favor verifica tu contraseña.",
        }
      }

      console.log("[v0] Usuario encontrado y autenticado:", user)

      const userInfo: User = {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      }

      localStorage.setItem("auth_current_user", JSON.stringify(userInfo))

      return {
        success: true,
        message: "Inicio de sesión exitoso",
        user: userInfo,
      }
    } catch (error) {
      console.error("Error en login:", error)
      return {
        success: false,
        message: "Error al iniciar sesión. Intenta de nuevo.",
      }
    }
  }

  logout(): void {
    try {
      localStorage.removeItem("auth_current_user")
      this.wrapped.logout()
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  getCurrentUser(): User | null {
    try {
      const user = localStorage.getItem("auth_current_user")
      return user ? JSON.parse(user) : null
    } catch (error) {
      console.error("Error al obtener usuario actual:", error)
      return null
    }
  }

  deleteUserAccount(email: string): boolean {
    try {
      const users = JSON.parse(localStorage.getItem("auth_users") || "[]")
      const filteredUsers = users.filter((u: any) => u.email !== email)

      if (users.length === filteredUsers.length) {
        return false // Usuario no encontrado
      }

      localStorage.setItem("auth_users", JSON.stringify(filteredUsers))

      // Actualizar lista de correos registrados
      const emails = filteredUsers.map((u: any) => u.email)
      localStorage.setItem("registered_emails", JSON.stringify(emails))

      // Borrar usuario actual si es el mismo
      const currentUser = localStorage.getItem("auth_current_user")
      if (currentUser) {
        const user = JSON.parse(currentUser)
        if (user.email === email) {
          localStorage.removeItem("auth_current_user")
        }
      }

      return true
    } catch (error) {
      console.error("Error al borrar cuenta:", error)
      return false
    }
  }
}

// Factory para crear el servicio de autenticación con todos los decoradores aplicados
export function createAuthService(dbManager: any): AuthComponent {
  // Flujo de ejecución: EmailValidation → PasswordValidation → Encryption → LocalStorage → Base
  let service: AuthComponent = new BaseAuthService()
  service = new LocalStorageDecorator(service, dbManager)
  service = new PasswordEncryptionDecorator(service)
  service = new PasswordValidationDecorator(service)
  service = new EmailValidationDecorator(service)

  return service
}

// Instancia singleton del servicio
import { dbManager } from "./dbManager" // Import dbManager
export const authService = createAuthService(dbManager)

export function deleteUserAccount(email: string): boolean {
  return authService.deleteUserAccount(email)
}

export function getRegisteredEmails(): string[] {
  try {
    const emails = localStorage.getItem("registered_emails")
    return emails ? JSON.parse(emails) : []
  } catch (error) {
    console.error("Error al obtener correos registrados:", error)
    return []
  }
}

export function getRegisteredUsersCount(): number {
  return getRegisteredEmails().length
}
