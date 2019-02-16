class Form extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind( this );
    this.clickHandler = this.clickHandler.bind( this );
    this.deleteHandler = this.deleteHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
  }

  state = {
    list : [],
    word : "",
    warning: "",
    className: "",
  }

  changeHandler(event){
    if (event.target.value.length < 2 || event.target.value.length > 199){
      this.setState({warning: "Input must be between 2 - 200 characters.", className: "error"});
    } else {
      this.setState({warning: ""});
    }
    console.log("change", event.target.value);
    this.setState({word:event.target.value});
  }

  clickHandler(){
    if (this.state.word.length >= 2 && this.state.word.length <= 199){
      let tempList = [...this.state.list];
      tempList.push(this.state.word);
      this.setState({list: tempList, word: "", className: ""})
    }
  }

  editHandler(index){
    let tempWord = this.state.list[index];
    console.log("sup",tempWord)
    this.setState({word: tempWord, warning: "Edit word above!"});
    this.deleteHandler(index);
  }
  
  deleteHandler(index){
    console.log("oi")
    let tempList = [...this.state.list];
    tempList.splice(index, 1);
    this.setState({list: tempList});
  }

  render() {
      // render the list with a map() here
      return (
        <React.Fragment>
          <div className="form">
            <textarea onChange={this.changeHandler} value={this.state.word}/>
            <button onClick={this.clickHandler}>Add Item</button>
            <p className={this.state.className}>{this.state.warning}</p>
          </div>

          <div className="list">
            <ul>
              <List list={this.state.list} deleteHandler={this.deleteHandler} editHandler={this.editHandler}/>
            </ul>
          </div>
        </React.Fragment>
      );
  }
}


class List extends React.Component {
  render(){
    var eachItem;
    if (this.props.list.length === 0) {
      eachItem = "List is empty ): Add an item!"
    } else {
      eachItem = this.props.list.map((item, index) => {
       return  <React.Fragment>
                  <li>{item}</li>
                  <button onClick={() => this.props.editHandler(index)}>Edit</button>
                  <button onClick={() => this.props.deleteHandler(index)}>Delete</button>
              </React.Fragment>
      })
    }
    return (
      <React.Fragment>{eachItem}</React.Fragment>
    )
  }
}

ReactDOM.render(
    <Form/>,
    document.getElementById('root')
);

