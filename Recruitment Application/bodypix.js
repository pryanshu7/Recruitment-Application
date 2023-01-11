let start=false;

let start_btn = document.getElementById('btn-start');
start_btn.addEventListener('click',()=>{
    start = !start;
    main();

},true)

function main() {

    function handleSuccess(stream) {
        const video = document.querySelector('video');
        video.srcObject = stream;
    }

    navigator.mediaDevices.getUserMedia({ video: {width:500},audio:false})
        .then(handleSuccess)

    const sourceVideo = document.getElementById('vid-bodypix');
    // const drawCanvas = document.getElementById('canvas-bodypix');

    sourceVideo.onplaying = async() => {

        sourceVideo.width = sourceVideo.videoWidth;
        sourceVideo.height = sourceVideo.videoHeight;

        const net = await bodyPix.load({
            architecture: 'MobileNetV1',
            outputStride: 16,
            multiplier: 0.75,
            quantBytes: 2
        });

        await predictLoop(net)


    };


    async function predictLoop(net) {

        while (start) {

            const segmentation = await net.segmentPersonParts(sourceVideo, {
                flipHorizontal: false,
                internalResolution: 'medium',
                segmentationThreshold: 0.7
            });

            if(segmentation.allPoses[0]===undefined) continue

            let parts = segmentation.allPoses[0].keypoints;
            // let overall = segmentation.allPoses[0].score

            analysis(parts)

            // for (let i=0; i<parts.length; i++) {
            //     let part = parts[i]
            //     // all.push(`${part.score} : ${part.part}`)
            //     analysis(part)
            //
            // }






            //
            //
            // const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
            // const opacity = 0.7;
            // const flipHorizontal = false;
            // const maskBlurAmount = 0;
            //
            //
            // bodyPix.drawMask(
            //     drawCanvas, sourceVideo, coloredPartImage, opacity, maskBlurAmount,
            //     flipHorizontal);



        }}
}


let output1 = document.getElementById('op1')
let output2 = document.getElementById('op2')
let div_op = document.getElementById('div-op')
function analysis(parts) {
    console.log(parts)

    n = parts[0].score;
    l = parts[3].score;
    r = parts[4].score;


    if(n<0.10){
        output1.textContent=`out of frame`
        div_op.classList.add('warning')
    } else if(n>0.80){

        if (l>0.96){
            output1.textContent=`In frame & looking left`
        }

        else if (r>0.96){
            output1.textContent=`In frame & looking right`
        }else{output1.textContent=`In frame`}



        div_op.classList.remove('warning')
    }



    // console.log(n)
    // document.getElementById('op').textContent=`${parts}`


}



