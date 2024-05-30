import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

import 'bootstrap/dist/css/bootstrap.css';


function App() {
  const showEl = useRef()

  const [scene, setScene] = useState();
  const [camera, setCamera] = useState();
  const [renderer, setRenderer] = useState();
  const [controls, setControls] = useState();
  const [count, setCount] = useState(28);

  const [composer, setComposer] = useState();
  const [outlinePass, setOutlinePass] = useState();

  const [angle, setAngle] = useState();

  const [mtl1, setMtl1] = useState();
  const [mtl2, setMtl2] = useState();

  const [lastBox, setLastBox] = useState();

  useEffect(() => {
    console.log('animate')
    animate();
  }, [composer]);

  // 将角度转换为0到360度之间的值
  function normalizeAngle(angle) {
    angle = angle % 360; // 确保角度在0到359度之间
    if (angle < 0) {
      angle += 360; // 确保角度为正数
    }
    return angle;
  }

  // 将角度转换为前后左右方向
  function getDirection(angle) {
    angle = normalizeAngle(angle);
    // console.log(angle)
    if (angle >= 0 && angle < 20 || angle >= 340 && angle < 360) {
      return '正面';
    } else if (angle >= 20 && angle < 160) {
      return '右侧';
    } else if (angle >= 160 && angle < 210) {
      return '背面';
    } else if (angle >= 210 && angle < 340) {
      return '左侧';
    }
  }


  function animate() {

    requestAnimationFrame(animate);

    // if (renderer) {
    //   renderer.render(scene, camera);
    // }

    // 获取相机的旋转角度
    if (camera) {
      let rotation = camera.rotation;
      let angle = Math.round(THREE.MathUtils.radToDeg(rotation.z));
      let dir = getDirection(angle)

      setAngle(dir)
    }


    if (composer) {
      composer.render();
    }


  }


  useEffect(() => {
    if (showEl.current) {
      // console.log('showEl', showEl.current)
      init();
    }
  }, []);




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
    renderer.setClearColor(0xcccccc);
    //像素
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasW, canvasH);


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
        scene.add(gltf.scene);

        var mtl1 = scene.getObjectByName('c1').material.clone();
        var mtl2 = mtl1.clone();
        mtl2.color.set(0xA9A9A9);
        setMtl1(mtl1)
        setMtl2(mtl2)

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

    // 创建后期处理效果
    // postprocessing

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
    // outlinePass.usePatternTexture = true;
    outlinePass.visibleEdgeColor.set('#ffffff'); // 可见边缘颜色
    outlinePass.hiddenEdgeColor.set('#ffffff');  // 隐藏边缘颜色

    composer.addPass(outlinePass);

    // const textureLoader = new THREE.TextureLoader();
    // textureLoader.load(process.env.PUBLIC_URL +
    //   '/models/points.png', function (texture) {
    //     outlinePass.patternTexture = texture;
    //     texture.wrapS = THREE.RepeatWrapping;
    //     texture.wrapT = THREE.RepeatWrapping;
    //   });

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    const effectFXAA = new ShaderPass(FXAAShader);
    effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    composer.addPass(effectFXAA);

    setOutlinePass(outlinePass)
    setComposer(composer)

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

    if (lastBox) {
      lastBox.material = mtl1;
    }

    outlinePass.selectedObjects = [scene.getObjectByName('c' + item)];


    var box = scene.getObjectByName('c' + item);
    box.material = mtl2;

    setLastBox(box)

    setOutlinePass(outlinePass)

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


          <div style={{ position: 'absolute', margin: 8, backgroundColor: '#d3d3d3', textAlign: 'center' }}>
            <div style={{ margin: 8, width: 80 }}>{count} 件垛型 </div>
          </div>

          <div style={{ position: 'absolute', margin: 8, marginTop: 365, textAlign: 'center' }}>
            <div style={{ margin: 2 }}>{angle}</div>
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
              src={process.env.PUBLIC_URL + '/mount-fuji.svg'} ></img> 物流 &copy; 2021
          </footer>


        </div>


      </main>

    </div>
  )
}

export default App;
