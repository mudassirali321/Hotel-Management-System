import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject} from 'rxjs';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { resolve } from 'q';

@Injectable()
export class AppService {
  public currentUserId: string ;
  public currentUser: any ;

  public visitedScreens: string = "";
    public userId: string = null;// 'admin';
    orderStatusList = [{ id: "O", name: "Open", displaySeq: 1 },
        { id: "I", name: "In-Progress", displaySeq: 2 },
        { id: "D", name: "Delivered", displaySeq: 3 },
        { id: "S", name: "Successfully Closed", displaySeq: 4 },
        { id: "C", name: "Close (Without processing)", displaySeq: 5 },
    ];

    empTypes = [
        { id: "Admin", name: "Admin", displaySeq: 1 },
        { id: "Waiter", name: "Waiter", displaySeq: 2 },
        { id: "Chef", name: "Chef", displaySeq: 3 },
        { id: "Account", name: "Account", displaySeq: 4 },
    ]
  public serviceUrl: string = "http://localhost:21021/api/services/app/";
  


}
