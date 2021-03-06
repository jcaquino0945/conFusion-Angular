import { Component, OnInit } from '@angular/core';

import {Leader} from '../shared/leader'
import {Leaders} from '../shared/leaders'
import {LeaderService} from '../services/leader.service'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
leaders: Leader[] = Leaders;
  constructor(private leaderService: LeaderService) { }

  ngOnInit(): void {
    //this.leader = this.leaderService.getLeaders();
    //this.leaderService.getLeaders().then(leaders => this.leaders = leaders);
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders);
    }
  

}
