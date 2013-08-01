THREE.CSS3D = THREE.CSS3D || {};
THREE.CSS3D.Primitives = THREE.CSS3D.Primitives || {};

/*
	Base Primitive
*/
THREE.CSS3D.Primitives.Primitive = function(domElement) {
	THREE.CSS3DObject.call( this, domElement );
}

THREE.CSS3D.Primitives.Primitive.prototype = Object.create( THREE.CSS3DObject.prototype );

THREE.CSS3D.Primitives.Primitive.prototype.setDebug = function(flag) {
	if(flag === true) {
		this.element.classList.add("debug");
	}
	else {
		this.element.classList.remove("debug");
	}
}

THREE.CSS3D.Primitives.Primitive.prototype.enableDebug = function() { this.setDebug(true); }
THREE.CSS3D.Primitives.Primitive.prototype.disableDebug = function() { this.setDebug(false); }

/*
	Plane. 
	This is probably not neccessary, one could just use the CSSRenderer.
	However for the sake of completeness added it in.
*/
THREE.CSS3D.Primitives.Plane = function(w,h) {
	var domElement = document.createElement("div");
	var domElement3d = document.createElement("div");

	domElement.classList.add("three-plane-container");  
	domElement.style.width = w + "px";
	domElement.style.height = h + "px";

	domElement3d.classList.add("three-plane");
	domElement3d.style.width = "100%";
	domElement3d.style.height = "100%";
	domElement3d.style.position = "absolute";

	domElement.appendChild(domElement3d);

	THREE.CSS3D.Primitives.Primitive.call(this,domElement);
}

THREE.CSS3D.Primitives.Plane.prototype = Object.create( THREE.CSS3D.Primitives.Primitive.prototype );

/*
	Box
*/
THREE.CSS3D.Primitives.Box = function(w,h,d) {
	var domElement = document.createElement("div");
	var domElement3d = document.createElement("div");
	var sides = ["front","back","right","left","top","bottom"];
	var div;

	domElement.classList.add("three-box-container");  
	domElement.style.width = w + "px";
	domElement.style.height = h + "px";
	domElement.style.position = "relative";

	domElement3d.classList.add("three-box");
	domElement3d.style.width = "100%";
	domElement3d.style.height = "100%";
	domElement3d.style.margin = "0";
	domElement3d.style.border = "0";
	domElement3d.style.padding = "0";	
	domElement3d.style.position = "absolute";
	domElement3d.style.WebkitTransformStyle = 'preserve-3d';
	domElement3d.style.MozTransformStyle = 'preserve-3d';
	domElement3d.style.oTransformStyle = 'preserve-3d';
	domElement3d.style.transformStyle = 'preserve-3d';

	domElement.appendChild(domElement3d);

	sides.forEach(function(side) {
		var props = {};
		var transforms = {};

		div = document.createElement("div");
		div.classList.add("side");
		div.classList.add(side);
		div.style.display = "block";
		div.style.position = "absolute"

		switch(side) {
			case "front":
			props.width = w + "px";
			props.height = h + "px";
			transforms.rotateY = 0 + "deg";
			transforms.translateZ = d/2 + "px";
			break;

			case "back":
			props.width = w + "px";
			props.height = h + "px";
			transforms.translateZ = -d/2 + "px";
			break;

			case "left":
			props.width = d + "px";
			props.height = h + "px";
			props.left = (w-d)/2 + "px";
			transforms.rotateY = -90 + "deg";
			transforms.translateZ = w/2 + "px";
			break;

			case "right":
			props.width = d + "px";
			props.height = h + "px";
			props.left = (w-d)/2 + "px";
			transforms.rotateY = 90 + "deg";
			transforms.translateZ = w/2 + "px";
			break;

			case "top":
			props.width = w + "px";
			props.height = d + "px";
			props.top = (h-d)/2 + "px";
			transforms.rotateX = 90 + "deg";
			transforms.translateZ = h/2 + "px";
			break;

			case "bottom":
			props.width = w + "px";
			props.height = d + "px";
			props.top = (h-d)/2 + "px";
			transforms.rotateX = -90 + "deg";
			transforms.translateZ = h/2 + "px";
			break;
		}


		var key;
		for(key in props) {
			div.style[key] = props[key];
		}

		div.style.transform = "";
		div.style.webkitTransform = "";
		for(key in transforms) {
			div.style.transform += key + "(" + transforms[key] + ")";
			div.style.webkitTransform += key + "(" + transforms[key] + ")";
			div.style.mozTransform += key + "(" + transforms[key] + ")";
			div.style.oTransform += key + "(" + transforms[key] + ")";
		}

		domElement3d.appendChild(div);
	});

	THREE.CSS3D.Primitives.Primitive.call(this,domElement);
}

THREE.CSS3D.Primitives.Box.prototype = Object.create( THREE.CSS3D.Primitives.Primitive.prototype );

/*
	Cube
*/
THREE.CSS3D.Primitives.Cube = function(size) {
	THREE.CSS3D.Primitives.Box.call(this,size,size,size);

	this.element.classList.add("three-cube-container");
	this.element.firstChild.classList.add("three-cube");
}

THREE.CSS3D.Primitives.Cube.prototype = Object.create( THREE.CSS3D.Primitives.Box.prototype );

/*
	Pyramid
*/
THREE.CSS3D.Primitives.Pyramid = function(size) {
	var domElement = document.createElement("div");
	var domElement3d = document.createElement("div");
	var sides = ["base","front","left","right"];
	var div;

	var halfSize = size/2;
	var origin = size/2 + "px " + size/2 + "px " + size/2 + "px";
	var apex = size * (Math.sqrt(3)/2);

	domElement.classList.add("three-pyramid-container");  
	domElement.style.WebkitTransformOrigin = origin;
	domElement.style.MozTransformOrigin = origin;
	domElement.style.oTransformOrigin = origin;
	domElement.style.transformOrigin = origin;

	domElement3d.classList.add("three-pyramid");
	domElement3d.style.width = "0";
	domElement3d.style.height = "0";
	domElement3d.style.position = "absolute";
	domElement3d.style.WebkitTransformStyle = 'preserve-3d';
	domElement3d.style.MozTransformStyle = 'preserve-3d';
	domElement3d.style.oTransformStyle = 'preserve-3d';
	domElement3d.style.transformStyle = 'preserve-3d';

	domElement.appendChild(domElement3d);

	sides.forEach(function(side) {
		var props = {};
		var transforms = {};

		div = document.createElement("div");
		div.classList.add("side");
		div.classList.add(side);

		div.style.position = "absolute";
		div.style.width = 0;
		div.style.height = 0;
		div.style.margin = 0;
		div.style.border = 0;
		div.style.padding = 0;	
		div.style.WebkitTransformOrigin = "0 0";
		div.style.MozTransformOrigin = "0 0";
		div.style.oTransformOrigin = "0 0";
		div.style.transformOrigin = "0 0";
	    div.style.borderStyle = "solid";
	    div.style.borderWidth = (size/2) + "px 0 " + (size/2) + "px " + apex + "px";
	    div.style.borderColor = "transparent";

		// jk: TO DO
		switch(side) {
			case "base":
			transforms.rotateY = -19.5 + "deg";
			transforms.rotateX = 180 + "deg";
			transforms.translateY = -size + "px";
			break;

			case "front":
			transforms.rotateY = 90 + "deg";
			transforms.rotateZ = 60 + "deg";
			transforms.rotateX = 180 + "deg";
			transforms.translateY = -size + "px";
			break;

			case "left":
			transforms.rotateX = 60 + "deg";
			transforms.rotateY = 19.5 + "deg";
			break;

			case "right":
			var x = (size/100) * -29;
			var y = (size/100) * -50;
			var z = (size/100) * 81.5;

      		transforms.rotateX = -60 + "deg";
      		transforms.rotateY = 19.5 + "deg";
      		transforms.translateX = x + "px";
      		transforms.translateY = y + "px";
      		transforms.translateZ = z + "px";

			break;
		}


		var key;
		for(key in props) {
			div.style[key] = props[key];
		}

		div.style.transform = "";
		div.style.webkitTransform = "";
		for(key in transforms) {
			div.style.transform += key + "(" + transforms[key] + ")";
			div.style.webkitTransform += key + "(" + transforms[key] + ")";
			div.style.mozTransform += key + "(" + transforms[key] + ")";
			div.style.oTransform += key + "(" + transforms[key] + ")";
		}

		domElement3d.appendChild(div);
	});

	THREE.CSS3D.Primitives.Primitive.call(this,domElement);
}

THREE.CSS3D.Primitives.Pyramid.prototype = Object.create( THREE.CSS3D.Primitives.Primitive.prototype );