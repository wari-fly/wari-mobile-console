import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { TrackerService } from './tracker.service';

@Injectable()
export class DataService {

  constructor(private authService: AuthService, private trackerService: TrackerService) { }

  auth(): AuthService {
    return this.authService;
  }
  tracker(): TrackerService {
    return this.trackerService;
  }
}
