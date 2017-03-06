/*
 * @CreateTime: Mar 5, 2017 8:03 PM 
 * @Author: Emidio Bianco 
 * @Contact: emidiobia@gmail.com 
 * @Last Modified By: undefined
 * @Last Modified Time: Mar 6, 2017 12:00 AM
 * @Description: Class representing the point in a 2D plane 
 */


export function Point(){
  this.x = this.y =0;

  switch(arguments.length){
    case 0:
      break;
    case 1:
      if (typeof(arguments[0]) == 'object' ){ 
        if(Array.isArray(arguments[0])){
          this.x = arguments[0][0];
          this.y = arguments[0][1];
        }
        // TODO: should it clone the Point or use the instance ???? 
        else if(arguments[0] instanceof(Point)) {
          this.x = arguments[0].x;
          this.y = arguments[0].y;
        }
      } else {
        this.x = this.y = arguments[0];
      }
      break;
    case 2:
      this.x = arguments[0];
      this.y = arguments[1];
  }
}

Point.prototype = {

  setX: function(x){this.x = x},
  setY: function(y){this.y = y},

  set: function(x, y){
    this.setX(x);
    this.setY(y);
  },
 
  clone: function(){
    return new Point(this.x, this.y);
  },
}

export function Rectangle(width, height, originX, originY){
  this._width = width || 0;
  this._height = height || 0;
  
  /**
   * @class Point
   */
  this.origin = null;
  this.maxPoint = null

  if(arguments.length == 4){
    this.origin = new Point(originX, originY);
  } else {
    this.origin = new Point(0,0);
  }
  // this.maxPoint = new Point(
  //   this.origin.x + this._width,
  //   this.origin.y + this._height
  //   )
}

Rectangle.prototype = {
  //TODO:
  setOrigin: function(newX, newY){
    this.origin.set(newX, newY);
  },

  getOrigin: function(){
    return this.origin;
  },

  getMinPoint : function(){
    return this.getOrigin();
  },
  getmaxPoint : function(){
    return new Point(
      this.origin.x + this._width,
      this.origin.y + this._height
    );
  }
,}