var UmsZoom = {
  ratio: 10,
  inDefault: 100,
  minZoom: 80,
  maxZoom: 120,
  zoomIn: function () {
    this.inDefault = this.inDefault + this.ratio;
    if (this.inDefault >= this.maxZoom) {
      document.body.style.zoom = this.maxZoom + "%";
      this.inDefault = this.maxZoom;
    }else{
      document.body.style.zoom = this.inDefault + "%";
    }
  },
  zoomOut: function () {
    this.inDefault = this.inDefault - this.ratio;
    if (this.inDefault <= this.minZoom) {
      document.body.style.zoom = this.minZoom + "%";
      this.inDefault = this.minZoom;
    }else{
      document.body.style.zoom = this.inDefault + "%";
    }
  }
}