// import * as glpk from './glpk.min.js';
// import * as jszip from 'jszip';

// import * as lalolib from './lalolib';

import {Point} from './geom';

export function LiangBarsky(startX, startY, endX, endY, width, height, rectX, rectY){

  this.pStart = new Point(startX, startY), this.pEnd = new Point(endX, endY);

  this.xMin = rectX, 
  this.yMin = rectY;
  this.xMax = width,
  this.yMax = height;

}


LiangBarsky.prototype = {
 compute: function(){

  var deltaX = this.pEnd.x - this.pStart.x,
    deltaY = this.pEnd.y - this.pStart.y;

  var pLeft   = -deltaX, qLeft   = this.pStart.x - this.xMin,
      pRight  = deltaX,  qRight  = this.xMax - this.pStart.x,
      pBottom = -deltaY, qBottom = this.pStart.y - this.yMin,
      pTop    = deltaY,  qTop    = this.yMax - this.pStart.y;

  var uLeft  = qLeft/pLeft,
    uRight  = qRight/pRight,
    uBottom = qBottom/pBottom,
    uTop  = qTop/pTop;
  
  var p = new Array(), q = new Array();
  p.push(pLeft);p.push(pRight);p.push(pBottom);p.push(pTop);
  q.push(qLeft);q.push(qRight);q.push(qBottom);q.push(qTop);

  for (var i = 0; i < 4; i++) {
    if (p[i] == 0) {
      console.debug("line is parallel to one of the clipping boundary");
      if (q[i] >= 0) {
        // vertical
        if (i < 2) {
          if (y1 < this.yMin) {
            y1 = this.yMin;
          }

          if (y2 > this.yMax) {
            y2 = this.yMax;
          }

          console.log('line( ' + this.pStart.x + ',' + y1 + ',' + this.pEnd.x + ',' + y2 + ')');
          if (this.pStart.x < this.xMin || this.xMax < this.pEnd.x)
            return -1;
          else 
            return  [this.pStart.x, y1, this.pEnd.x, y2];
        }
        //horizontal
        if (i > 1) {
          if (x1 < this.xMin) {
            x1 = this.xMin;
          }

          if (x2 > this.xMax) {
            x2 = this.xMax;
          }
          console.log('line( ' + x1 + ',' + this.pStart.y + ',' + x2 + ',' + this.pEnd.y + ')');
          if (this.pStart.y < this.yMin || this.yMax < this.pEnd.y)
            return -1;
          else 
            return  [x1, this.pStart.y, x2, this.pEnd.y];
        }
      }
    }
  }

  var t1 = 0;
  var t2 = 1;

  for (var i = 0; i < 4; i++) {
    var temp = q[i] / p[i];

    if (p[i] < 0) {
      if (t1 <= temp)
        t1 = temp;
    }
    else {
      if (t2 > temp)
        t2 = temp;
    }
  }

//TODO: review
  if (t1 < t2) {
    let xx1 = x1 + t1 * p[1];
    let xx2 = x1 + t2 * p[1];
    let yy1 = y1 + t1 * p[3];
    let yy2 = y1 + t2 * p[3];
    console.log('line( ' + xx1 + ',' + yy1 + ',' + xx2 + ',' + yy2 + ')');
    return [xx1, yy1, xx2, yy2];
  }
}

}
