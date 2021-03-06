class Robot {
  constructor() {
    this.isPlaced = false
    this.position = {
      x: null,
      y: null
    }
    this.curDirection = null
  }

  execute(commands) {
    let robot = this;
    for (let i = 0; i < commands.length; i++) {
      let command = commands[i]
      if (command.args) {
        robot = this[command.command](command.args[0], command.args[1], command.args[2])
      } else {
        robot = this[command.command]()
      }
    }
    return robot
  }

  place(x, y, direction) {
    //check if the position is out of table
    if (x > tableSize.x || y > tableSize.y) {
      this.isPlaced = false
      return this
    }
    this.isPlaced = true
    this.position.x = x
    this.position.y = y
    this.curDirection = direction
    return this
  }

  move() {
    if (!this.isPlaced) {
      return this;
    }
    
    let x = this.position.x
    let y = this.position.y

    switch (this.curDirection) {
      case 'north':
      if (++ y < tableSize.y) {
        this.position = { x: x, y: y }
      }
      break;
    case 'east':
      if (++ x < tableSize.x) {
        this.position = { x: x, y: y }
      }
      break;
    case 'south':
      if (-- y >= 0) {
        this.position = { x: x, y: y };
      }
      break;
    case 'west':
      if (-- x >= 0) {
        this.position = { x: x, y: y }
      }
      break;
    default:
      break;
    }
    return this
  }

  turn(direction) {
    if (!this.isPlaced) {
      return this;
    }
    const dir = directions[this.curDirection][direction]
    if (dir) {
      this.curDirection = dir
    }
    return this
  }

  report() {
    if (!this.isPlaced) {
      return this;
    }
    console.log('\nExpected Output: ' + [this.position.x, this.position.y, this.curDirection.toUpperCase()].join(','))
  }
}

const tableSize = { x: 4, y: 4 }; // 0-4

//maps of dicection
const directions = {
  north: {
    value: 'north',
    left: 'west',
    right: 'east'
  },
  east: {
    value: 'east',
    left: 'north',
    right: 'south'
  },
  south: {
    value: 'south',
    left: 'east',
    right: 'west'
  },
  west: {
    value: 'west',
    left: 'south',
    right: 'north'
  }
}

module.exports = Robot;