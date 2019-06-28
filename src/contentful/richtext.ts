
namespace Richtext {


  type Node<T extends string> = {
    nodeType: T
    data?: any
  }

  
  type Document = Node<"document"> & { content: any }
  
}

export default Richtext