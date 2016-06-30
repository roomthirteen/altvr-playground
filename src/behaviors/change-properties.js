import Please from 'pleasejs';
import THREE from 'three';

export default class ChangePropertiesBehavior {
  constructor(changeProperties) {
    this.changeProperties = changeProperties;
  }

  awake(object3d) {
    console.log(object3d);
    const sync = object3d.getBehaviorByType('Object3DSync');
    this.colorRef = sync.dataRef.child('color');
    this.object3d = object3d;
    //this.colorRef.on('value', this.onNewColor.bind(this));
    object3d.addEventListener('cursordown', this.onCursorDown.bind(this));
  }

  /*onNewColor(snapshot) {
    const value = snapshot.val();
    if (!value) return; // we are first to create the cube, no color set yet
    this.object3d.material.color = new THREE.Color(value);
    this.object3d.material.needsUpdate = true; // currently required in Altspace
  }*/

  onCursorDown() {
    var propertiesToChange = this.changeProperties;
    this.changeProperties = {};
    for (var propertyName in propertiesToChange) {
      console.log("change "+propertyName);
      this.changeProperties[propertyName] = this.object3d[propertyName];
      this.object3d[propertyName] = propertiesToChange[propertyName];
    }
  }

  update(deltaTime) {
    /* no updating needed, color changes in Firebase 'value' callback above */
  }
}
