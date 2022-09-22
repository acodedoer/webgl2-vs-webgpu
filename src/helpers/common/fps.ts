 const getContainer = (containerID:string ="fps"):[HTMLElement,number, any] => {
    let fpsContainer:HTMLElement = document.createElement('div');
    fpsContainer = document.getElementById("fps") as HTMLElement;
    let fps:number = 1;
    const times:any = [];
    return [fpsContainer, fps, times];
}

const display = (timestamp: number, times:any[], fps:number, fpsContainer:HTMLElement) => {
    while (times.length > 0 && times[0] <= timestamp - 1000) {
        times.shift();
      }
      times.push(timestamp);
      fps = times.length;
      fpsContainer.innerText = fps.toString();
}

const FPS = {getContainer, display};
export default FPS;