song_left = "";
song_right = "";
song_left_status = "";
song_right_status = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
    song_left = loadSound("music.mp3");
    song_right = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 600);
    canvas.center();


    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Loaded');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist" + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw()
{
    image(video, 0, 0, 600, 600);
    song_left_status = song_left.isPlaying();
    song_right_status = song_right.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song_right.stop();
        if(song_left_status == false)
        {
            song_left.play();
            document.getElementById(song).innerHTML = "Song is Peter Pan Song";
        }
        song_left.setVolume(volume);
    }
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song.stop();
        if(song_right_status == false)
        {
            song_right.play();
            document.getElementById(song).innerHTML = "Song is Harry Potter Song";
        }
        song_right.setVolume(volume);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}