import React from 'react';
import { Graph, Shape, Edge, NodeView } from '@antv/x6';

class MyShape extends Shape.Rect {
  getInPorts() {
    return this.getPortsByGroup('in');
  }

  getOutPorts() {
    return this.getPortsByGroup('out');
  }

  getUsedInPorts(graph: Graph) {
    const incomingEdges = graph.getIncomingEdges(this) || []
    return incomingEdges.map((edge: Edge) => {
      const portId = edge.getTargetPortId()
      return this.getPort(portId!)
    });
  }

  getNewInPorts(length: number) {
    return Array.from({ length }, () => {
      return {
        group: 'in',
      }
    });
  }

  updateInPorts(graph: Graph) {
    const minNumberOfPorts = 1
    const ports = this.getInPorts()
    const usedPorts = this.getUsedInPorts(graph)
    const newPorts = this.getNewInPorts(Math.max(minNumberOfPorts - usedPorts.length, 1))

    if (ports.length === minNumberOfPorts && ports.length - usedPorts.length > 0) {
      // noop
    } else if (ports.length === usedPorts.length) {
      this.addPorts(newPorts)
    } else if (ports.length + 1 > usedPorts.length) {
      this.prop(['ports', 'items'], this.getOutPorts().concat(usedPorts).concat(newPorts), { rewrite: true });
    }

    return this
  }
}

MyShape.config({
  attrs: {
    root: {
      magnet: false,
    },
    body: {
      fill: '#f5f5f5',
      stroke: '#d9d9d9',
      strokeWidth: 1,
    },
  },
  ports: {
    items: [
      {
        group: 'out',
      },
    ],
    groups: {
      in: {
        position: {
          name: 'top',
        },
        attrs: {
          portBody: {
            magnet: 'passive',
            r: 6,
            stroke: '#ffa940',
            fill: '#fff',
            strokeWidth: 2,
          },
        },
      },
      out: {
        position: {
          name: 'bottom',
        },
        attrs: {
          portBody: {
            magnet: true,
            r: 6,
            fill: '#fff',
            stroke: '#3199FF',
            strokeWidth: 2,
          },
        },
      },
    },
  },
  portMarkup: [
    {
      tagName: 'circle',
      selector: 'portBody',
    },
  ],
});


const data = {
  // 节点
  nodes: [
    {
      id: 'node1',
      x: 40,
      y: 40,
      width: 160,
      height: 80,
      label: 'Hello',
      ports: {
        groups: {
          in: {
            position: 'left',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              },
            },
          },
          // 输出链接桩群组定义
          out: {
            position: 'right',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              },
            },
          },
        },
        items: [
          {
            id: 'port1',
            group: 'in',
          },
          {
            id: 'port2',
            group: 'out',
          },
        ],
      },
    },

    {
      id: 'node2',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'World',
    },
  ],
  // 边
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
}

const magnetAvailabilityHighlighter = {
  name: 'stroke',
  args: {
    attrs: {
      fill: '#fff',
      stroke: '#47C769',
    },
  },
};

export default class Example extends React.Component {
  private graph: Graph | null;

  constructor(props: any) {
    super(props);
    this.graph = null;
  }

  componentDidMount() {
    let container = document.getElementById("container");
    if (container != null) {
      this.graph = new Graph({
        container: container,
        width: window.innerWidth,
        height: window.innerHeight,
        scroller: {
          enabled: true,
          className: 'my-scroller',
        },
        background: {
          color: '#fffbe6', // 设置画布背景颜色
        },
        grid: {
          size: 10,      // 网格大小 10px
          visible: true, // 渲染网格背景
        },
        highlighting: {
          magnetAvailable: magnetAvailabilityHighlighter,
          magnetAdsorbed: {
            name: 'stroke',
            args: {
              attrs: {
                fill: '#fff',
                stroke: '#31d0c6',
              },
            },
          },
        },
        connecting: {
          snap: true,
          allowBlank: false,
          allowLoop: false,
          highlight: true,
          connector: 'rounded',
          connectionPoint: 'boundary',
          router: {
            name: 'er',
            args: {
              direction: 'V',
            },
          },
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: '#a0a0a0',
                  strokeWidth: 1,
                  targetMarker: {
                    name: 'classic',
                    size: 7,
                  },
                },
              },
            })
          },
          validateConnection({ sourceView, targetView, targetMagnet }) {
            if (!targetMagnet) {
              return false
            }

            if (targetMagnet.getAttribute('port-group') !== 'in') {
              return false
            }

            if (targetView) {
              const node = targetView.cell
              if (node instanceof MyShape) {
                const portId = targetMagnet.getAttribute('port')
                const usedInPorts = node.getUsedInPorts(this)
                if (usedInPorts.find((port) => port && port.id === portId)) {
                  return false
                }
              }
            }
            return true
          },
        },
      })
    }

    if (this.graph != null) {
      // this.graph.fromJSON(data)
      this.graph.addNode(
        new MyShape().resize(120, 40).position(200, 50).updateInPorts(this.graph),
      )

      this.graph.addNode(
        new MyShape().resize(120, 40).position(400, 50).updateInPorts(this.graph),
      )

      this.graph.addNode(
        new MyShape().resize(120, 40).position(300, 250).updateInPorts(this.graph),
      )
      let g = this.graph;
      const update = (view: NodeView) => {
        const cell = view.cell
        if (cell instanceof MyShape) {
          cell.getInPorts().forEach((port) => {
            const portNode = view.findPortElem(port.id!, 'portBody')
            view.unhighlight(portNode, {
              highlighter: magnetAvailabilityHighlighter,
            })
          });
          cell.updateInPorts(g);
        }
      }

      this.graph.on('edge:connected', ({ previousView, currentView }) => {
        if (previousView) {
          update(previousView as NodeView)
        }
        if (currentView) {
          update(currentView as NodeView)
        }
      })
    }
  }

  render() {
    return (
      <div className="container h-screen">
        <div className="" id="container" />
      </div>
    )
  }
}
