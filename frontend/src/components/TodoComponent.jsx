import '../css/TodoComponent.css'

export function TodoComponent(props){
    return <div id="todoComponent">
        <h2>{props.title}</h2>
        <h5>{props.description}</h5>
    </div>
}