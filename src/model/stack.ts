import { Node } from './node'
export class Stack {
  public head: Node | null
  public count: number
  constructor() {
    this.head = null
    this.count = 0
  }

  public Stack(): void {
    this.head = null
  }

  public push(data: fabric.Object | null): void {
    const temp: Node | null = this.head
    this.head = new Node(data)
    this.head.next = temp
    this.count++
  }

  public pop(): fabric.Object | null {
    if (this.head == null) return null
    const temp: Node | null = this.head
    this.head = this.head.next
    this.count--
    return temp.data
  }

  public peek(): fabric.Object | null {
    if (this.head == null) return null
    return this.head.data
  }

  public empty(): void {
    this.head = null
    this.count = 0
  }
}
