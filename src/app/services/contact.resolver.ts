import { inject } from "@angular/core"
import{ActivatedRouteSnapshot} from "@angular/router"
import { ContactService } from "./contact.service"

export function contactResolver (route:ActivatedRouteSnapshot) {
    const id=  route.params['id']
    return inject(ContactService).getContactById(id)
  



}