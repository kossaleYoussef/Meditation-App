const app = ()=>{
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //pick Diffirent sounds
    sounds.forEach(sound =>{
        sound.addEventListener('click',function(){
            song.src = this.getAttribute('data-sound');
            //video.src = this.getAttribute('data-video');
            document.querySelector('body').style.backgroundImage = `url(${this.getAttribute('data-img')})`;
            checkPlayed(song);
        });
    });

    // Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    // get the lenght of the outline
    const outlineLength = outline.getTotalLength();
    
    //Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // play Sound
    play.addEventListener('click',()=>{
        checkPlayed(song);
    });

    // Select Sound
    timeSelect.forEach(option =>{
        option.addEventListener('click',function(){
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    })

    // change stats
    const checkPlayed = song=>{
        if(song.paused){
            song.play();
            //video.play();
            play.src = './svg/pause.svg';
        }else{
            song.pause();
            //video.pause();
            play.src = './svg/play.svg';
        }
    }

    //Animate circle
    song.ontimeupdate = ()=>{
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            //video.pause();
        }
    }
    
}



app();