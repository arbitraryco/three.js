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

	domElement.classList.add("css3d-plane-container");  
	domElement.style.width = w + "px";
	domElement.style.height = h + "px";

	domElement3d.classList.add("css3d-plane");
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
	var figure;

	domElement.classList.add("css3d-box-container");  
	domElement.style.width = w + "px";
	domElement.style.height = h + "px";
	domElement.style.position = "relative";

	domElement3d.classList.add("css3d-box");
	domElement3d.style.width = "100%";
	domElement3d.style.height = "100%";
	domElement3d.style.position = "absolute";
	domElement3d.style.WebkitTransformStyle = 'preserve-3d';
	domElement3d.style.MozTransformStyle = 'preserve-3d';
	domElement3d.style.oTransformStyle = 'preserve-3d';
	domElement3d.style.transformStyle = 'preserve-3d';

	domElement.appendChild(domElement3d);

	sides.forEach(function(side) {
		var props = {};
		var transforms = {};

		figure = document.createElement("figure");
		figure.classList.add("side");
		figure.classList.add(side);
		figure.style.display = "block";
		figure.style.position = "absolute";

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
			figure.style[key] = props[key];
		}

		figure.style.transform = "";
		figure.style.webkitTransform = "";
		for(key in transforms) {
			figure.style.transform += key + "(" + transforms[key] + ")";
			figure.style.webkitTransform += key + "(" + transforms[key] + ")";
		}

		domElement3d.appendChild(figure);
	});

	THREE.CSS3D.Primitives.Primitive.call(this,domElement);
}

THREE.CSS3D.Primitives.Box.prototype = Object.create( THREE.CSS3D.Primitives.Primitive.prototype );

/*
	Cube
*/
THREE.CSS3D.Primitives.Cube = function(size) {
	THREE.CSS3D.Primitives.Box.call(this,size,size,size);
}

THREE.CSS3D.Primitives.Cube.prototype = Object.create( THREE.CSS3D.Primitives.Box.prototype );

