type propsType = {
    text: string
}

const TaskEntry = (props: propsType) => {
    const { text } = props

    return (
        <div>
            {text}
        </div>
    )
}

export default TaskEntry

