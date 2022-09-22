const showControls = (id:string = "controls-container") => {
    let controls:HTMLElement = document.createElement('div'); 
    controls = document.getElementById(id) as HTMLElement;
    controls.style.display="block";
    controls.innerHTML= `
        <div id="controls-control" data-open="true" class="flex-spaced-between">
            <p class="no-space">Controls</p>
            <p class="no-space" id="controls-icon">&#9650;</p>
        </div>
        <table  id="controls-body" style="background-color: #e5e8ec; width: 100%;">
        </table>`
}

const createLabel = (label:string): HTMLElement => {
    const labelEl = document.createElement('label');
    labelEl.setAttribute("for",label);
    labelEl.innerHTML = label;
    return labelEl;
}

const createInput = (type:string, label:string, options:any[], current:any): HTMLElement => {
    const inputEl = document.createElement('input');
    inputEl.type="range";
    inputEl.id=label;
    inputEl.name=label;
    inputEl.min=options[0];
    inputEl.max=options[1];
    inputEl.value=current;
    return inputEl;
}

const createRow = (label:HTMLElement, control:HTMLElement) => {
    const row = document.createElement('tr');
    const tdLabel = document.createElement('td');
    tdLabel.appendChild(label);
    const tdInput = document.createElement('td');
    tdInput.appendChild(control);
    row.appendChild(tdLabel);
    row.appendChild(tdInput)
    return row;
}

const addControl = (type:string, label:string, options:any[], current:any, callback:any, tableID:string="controls-body") => {
    const table = document.getElementById(tableID);
    switch (type) {
        case "range":
        const labelEl = createLabel(label);
        const inputEl = createInput(type, label, options, current);
        const row = createRow(labelEl, inputEl);
        table?.appendChild(row);
        inputEl.addEventListener('input', (e:any)=>{
            console.log("change");
                callback(e.target?.value)
        })
        break;
    default:
        return;
    }
}

const GUI = {
    show:showControls,
    add:addControl
}

export default GUI;