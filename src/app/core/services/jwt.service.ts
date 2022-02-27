import { Injectable } from "@angular/core"
import { JWT_TOKEN_KEY } from "../constant" 

@Injectable({
  providedIn: 'root'
})

export class JwtService {

  getToken (): string {
    return window.localStorage[JWT_TOKEN_KEY]
  }

  saveToken(token: string) {
    window.localStorage[JWT_TOKEN_KEY] = token
  }

  destroyToken () {
    window.localStorage.removeItem(JWT_TOKEN_KEY)
  }
}
