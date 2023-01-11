


(() => {
    let run = false;

    let pause_btn_face = document.getElementById("pause-btn-face");

    pause_btn_face.addEventListener('click', function (e) {
        if (run) {
            run = false
        } else run = true
        main()


    }, false);



    const sourceVideo = document.getElementById('vid-face');
    const drawCanvas = document.getElementById('canvas-face');

// Drawing Mesh
    const drawMesh = (predictions, ctx) => {
        ctx.clearRect(0, 0, 300, 400)
        if (predictions.length > 0) {
            predictions.forEach((prediction) => {
                const keypoints = prediction.scaledMesh;

                //  Draw Triangles
                for (let i = 0; i < TRIANGULATION.length / 3; i++) {
                    // Get sets of three keypoints for the triangle
                    const points = [
                        TRIANGULATION[i * 3],
                        TRIANGULATION[i * 3 + 1],
                        TRIANGULATION[i * 3 + 2],
                    ].map((index) => keypoints[index]);
                    //  Draw triangle
                    drawPath(ctx, points, true);
                }

                // Draw Dots
                for (let i = 0; i < keypoints.length; i++) {
                    const x = keypoints[i][0];
                    const y = keypoints[i][1];

                    ctx.beginPath();
                    ctx.arc(x, y, 1 /* radius */, 0, 3 * Math.PI);
                    // ctx.fillStyle = "aqua";
                    ctx.fill();
                }
            });
        }
    };

// Triangle drawing method
    const drawPath = (ctx, points, closePath) => {
        const region = new Path2D();
        region.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
            const point = points[i];
            region.lineTo(point[0], point[1]);
        }

        if (closePath) {
            region.closePath();
        }
        ctx.strokeStyle = "grey";
        ctx.stroke(region);
    };




    function main() {

        function handleSuccess(stream) {
            sourceVideo.srcObject = stream;
        }

        navigator.mediaDevices.getUserMedia({video: {width: 440}, audio: false})
            .then(handleSuccess)


        sourceVideo.onplaying = async () => {
            sourceVideo.width = sourceVideo.videoWidth;
            sourceVideo.height = sourceVideo.videoHeight;

            const model = await faceLandmarksDetection.load(
                faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);

                await predictLoop(model)

        };


        async function predictLoop(model) {

            while (run) {

                const faces = await model.estimateFaces({input: sourceVideo});
                drawMesh(faces, drawCanvas.getContext('2d'))

            }
        }


    }

    main()

})()



