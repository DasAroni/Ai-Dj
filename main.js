
song = ''

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftwrist = 0;
scoreRightwrist = 0;

function preload() {
    song = loadSound('music.mp3')
}
function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function modelLoaded() {
    console.log('model has loaded')
}

function gotPoses(results) {


    if (results.length > 0) {
        console.log(results)

        leftWristX = results[0].pose.leftWrist.X
        leftWristY = results[0].pose.leftWrist.Y

        rightWristX = results[0].pose.rightWrist.X
        rightWristY = results[0].pose.rightWrist.Y

        scoreLeftwrist = results[0].pose.keypoints[9].score
        scoreRightwrist = results[0].pose.keypoints[10].score
    }
}

function draw() {
    image(video, 0, 0, 600, 500)

    fill("#FF0000")
    stroke("#FF0000")
    if (scoreLeftwrist > 0.2) {
        circle(leftWristX, leftWristY, 20)
        InNumberleftwristY = Number(leftWristY)

        volume = floor(InNumberleftwristY / 500)
        document.getElementById("volume").innerHTML = "Volume : " + volume;
        song.setVolume(volume)
    }

    if (scoreRightwrist > 0.2) {
        circle(rightWristX, rightWristY, 20)

        if (rightWristY > 0 && rightWristY < 100) {
            song.rate(0.5)
            document.getElementById("speed").innerHTML = "speed : 0.5"
        }
        else if (rightWristY > 100 && rightWristY < 200) {
            song.rate(1)
            document.getElementById("speed").innerHTML = "speed : 1.0"
        }

        else if (rightWristY > 200 && rightWristY < 300) {
            song.rate(1.5)
            document.getElementById("speed").innerHTML = "speed : 1.5"
        }

        else if (rightWristY > 300 && rightWristY < 400) {
            song.rate(2)
            document.getElementById("speed").innerHTML = "speed : 2.0"
        }

        else if (rightWristY > 400 && rightWristY < 500) {
            song.rate(2.5)
            document.getElementById("speed").innerHTML = "speed : 2.5"
        }

    }
    
}

function play() {
    song.play()
    song.setVolume(1)
    song.rate(1)
}