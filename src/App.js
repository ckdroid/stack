import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

import 'bootstrap/dist/css/bootstrap.css';


function App() {
  const showEl = useRef()

  const [scene, setScene] = useState();
  const [camera, setCamera] = useState();
  const [renderer, setRenderer] = useState();
  const [controls, setControls] = useState();
  const [count, setCount] = useState(28);

  const [model, setModel] = useState();


  useEffect(() => {
    console.log('animate')
    animate();
  }, [renderer]);

  function animate() {
    // console.log('animate')
    requestAnimationFrame(animate);
    // if (cube) {
    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;
    // }
    if (renderer) {
      renderer.render(scene, camera);
    }

  }


  useEffect(() => {
    if (showEl.current) {
      // console.log('showEl', showEl.current)
      init();
    }
  }, []);


  // useEffect(() => {
  //   if (model) {
  //     console.log('model',model)
  //     if (scene) {

  //       let mesh01 = new THREE.Mesh(model.geometry,model.material);
  //       mesh01.scale.x=model.scale.x
  //       mesh01.scale.y=model.scale.y
  //       mesh01.scale.z=model.scale.z
  //       scene.add(mesh01);

  //       let mesh02 = new THREE.Mesh(model.geometry,model.material);
  //       mesh02.position.x=9.3
  //       mesh02.scale.x=model.scale.x
  //       mesh02.scale.y=model.scale.y
  //       mesh02.scale.z=model.scale.z
  //       scene.add(mesh02);

  //       let mesh03 = new THREE.Mesh(model.geometry,model.material);
  //       mesh03.position.x=9.3
  //       mesh03.scale.x=model.scale.x
  //       mesh03.scale.y=model.scale.y
  //       mesh03.scale.z=model.scale.z
  //       scene.add(mesh03);



  //     }
  //   }
  // }, [model]);


  const init = () => {

    let canvasW = showEl.current.clientWidth;
    let canvasH = showEl.current.clientHeight;

    console.log('w:' + canvasW + '    h:' + canvasH)

    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const camera = new THREE.PerspectiveCamera(45, canvasW / canvasH, 0.1, 1000);

    setScene(scene);
    setCamera(camera);
    setRenderer(renderer);


    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setClearColor(0xcccccc);
    //像素
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasW, canvasH);



    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // let cube = new THREE.Mesh(geometry, material);
    // setCube(cube)

    // scene.add(cube);

    camera.position.z = 30;
    camera.position.x = 0;
    camera.position.y = 15;
    // console.log('camera', camera)


    //环境光
    const ablight = new THREE.AmbientLight(0xFFFFFF, 2);
    scene.add(ablight);

    const light = new THREE.DirectionalLight(0xFFFFFF, 3 * Math.PI);
    light.position.set(0.5, 0, 0.866);
    //light.target.position.set(-5, 0, 0);
    camera.add(light);
    scene.add(camera);


    const controls = new OrbitControls(camera, renderer.domElement);
    //限制角度
    controls.maxPolarAngle = 1.5;
    controls.minPolarAngle = 0.3;
    // controls.maxAzimuthAngle = 0.5;
    // controls.minAzimuthAngle = -0.5;

    controls.update();
    setControls(controls)



    const loader = new GLTFLoader();
    loader.load(process.env.PUBLIC_URL +
      '/models/model06.glb',
      (gltf) => {
        // called when the resource is loaded
        console.log('模型加载完成');
        // console.log('gltf', gltf)

        // setModel(gltf.scene.children[0])
        scene.add(gltf.scene);


      },
      (xhr) => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
      },
      (error) => {
        // called when loading has errors
        console.error('An error happened', error);
      },
    );


    renderer.render(scene, camera);
    showEl.current.appendChild(renderer.domElement);
  }


  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]

  const hundleClick = (item) => {
    // console.log(item)

    arr.forEach(element => {

      if (element > item) {
        scene.getObjectByName('c' + element).visible = false
      } else {
        scene.getObjectByName('c' + element).visible = true
      }
    });

    setCount(item)

    // console.log('c28', scene.getObjectByName('c28'))

  }


  return (
    <div className='container'>



      <main>
        <div className="container py-2">
          <header className="pb-1 mb-2 border-bottom">
            <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
              <img alt='Welcome' width="50" height="32" src={process.env.PUBLIC_URL + '/mount-fuji.svg'}></img>
              <span className="fs-4">箱体垛型演示</span>
            </a>
          </header>

          <div style={{ position: 'absolute', margin: 8 }}>
            {count} 件垛型
          </div>

          <div
            id="canvas"
            style={{ width: '100%', height: '400px', background: '#888' }}
            ref={showEl}
          />

          <div className="mt-1" style={{ width: '100%', }}>

            {arr.map((item, index) => {
              return (

                <button
                  key={index}
                  className="btn btn-outline-secondary mt-1 text-center"
                  style={{
                    width: '12%',
                    padding: '0.375rem 0.5rem',
                    marginRight: '0.5%'
                    // backgroundColor: 'red'

                  }}
                  onClick={hundleClick.bind(this, item)}
                >
                  {item}
                </button>

              )
            })}

            <button className="btn btn-outline-dark mt-1 text-center"
              style={{ width: '23%', marginRight: '1%', marginLeft: '1%' }}
              onClick={() => {
                controls.reset();
                camera.position.z = 30;
                camera.position.x = 0;
                camera.position.y = 15;
                controls.update();
              }}
            >正面</button>

            <button className="btn btn-outline-dark mt-1 text-center"
              style={{ width: '23%', marginRight: '1%', marginLeft: '0.5%' }}
              onClick={() => {
                controls.reset();
                camera.position.z = -30;
                camera.position.x = 0;
                camera.position.y = 15;
                controls.update();

              }}
            >背面</button>

          </div>




          <footer className="pt-3 mt-4 text-muted border-top text-center" >
            <img alt='Welcome' style={{ marginTop: -10 }} width="30" height="24"
              src={process.env.PUBLIC_URL + '/mount-fuji.svg'} ></img> 峰 &copy; 2021
          </footer>


        </div>


      </main>

    </div>
  )
}

export default App;
