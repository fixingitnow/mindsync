type propsType = {
    text: string
}

const TaskEntry = (props: propsType) => {
    const { text } = props

    return (
        <form className="bg-red">
            <label>
                <input type="text" />
                {text}
            </label>
        </form>
    )
}

export default TaskEntry

