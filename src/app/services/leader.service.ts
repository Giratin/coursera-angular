import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }


  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve =>{
      setTimeout(()=>{
        resolve(LEADERS)
      }, 2000)
    });
  }

  getLeader(id: string) : Promise<Leader> {
    return new  Promise(resolve =>{
      setTimeout(()=>{
        resolve(LEADERS.filter((leader : Leader) => (leader.id === id))[0])
      },2000)
    })
  }

  getFeatured(): Promise<Leader> {
    return new Promise(resolve => {
      setTimeout(()=>{
        resolve(LEADERS.filter((leader : Leader) => (leader.featured === true))[0])
      }, 2000)
    })
  }
}
