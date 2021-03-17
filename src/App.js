import { Component } from 'react';
import TodoList from './components/todos/TodoList';
import TodoForm from './components/todos/TodoForm';
import Footer from './components/todos/Footer';
class App extends Component {
  state = { todos: [
      { id: 1, title: "Learn Rails", complete: true },
      { id: 2, title: "Learn React", complete: false },
      { id: 3, title: "Learn Router", complete: false },
    ],
    filter: 'All'
  }
  setFilter = (filter) => this.setState({ filter })
  getUniqId = () => {
    //NOTE We are just using this as a helper function for id's since we aren't using a db yet
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  addTodo = (incommingTodo) => {
    const { todos } = this.state
    const { title, complete } = incommingTodo
    // const newTodo = { id: this.getUniqId(), title: title, complete: complete}
    const newTodo = { id: this.getUniqId(), title, complete }
    this.setState({ todos: [newTodo, ...todos]})
    // this.setState({ todos: [newTodo, 
    //   { id: 1, title: "Learn Rails", complete: true },
    //   { id: 2, title: "Learn React", complete: false },
    //   { id: 3, title: "Learn Router", complete: false },
    // ]})
    // this.setState({ todos: [...todos, newTodo]})
  }
  updateComplete = (id) => {
    const { todos } = this.state
    this.setState({
      todos: todos.map( t => {
        if (t.id === id) {
          return {
            ...t, 
            complete: !t.complete
          }
        }
        return t
      })
    })
  }
  visibleItems = () => {
    const { todos, filter } = this.state 
    switch(filter) {
      case 'Active':
        return todos.filter( t => !t.complete)
      case 'Completed':
        return todos.filter( t => t.complete)
      default:
        return todos
    }
  }
  render() {
    const { todos, filter } = this.state
    return (
      <>
        <Footer filter={filter} setFilter={this.setFilter} />
        <TodoList todos={this.visibleItems()} updateComplete={this.updateComplete} />
        <TodoForm addTodo={this.addTodo} />
      </>
    )
  }
}
export default App;