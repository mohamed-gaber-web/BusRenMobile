import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { EMPTY } from "rxjs";
import { getListProblems } from "../constants/api.constants";
import { DataService } from "../services/data.service";

@Injectable({ providedIn: 'root' })

export class ReportListResolver implements Resolve<any>{
    
    constructor(private dataService: DataService) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let queryParams = new HttpParams();
        queryParams = queryParams.set('page', 1);
        queryParams = queryParams.set('size', 5);
        queryParams = queryParams.set('langCod', 'en-US');
        const data = this.dataService.get(`${getListProblems}`, {params: queryParams});

        if (data) {
            return data;
        } else {
            EMPTY
        }
    }
}