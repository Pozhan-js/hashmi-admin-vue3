// import MessageBox from '../views/testComponents/myDialog/components/MessageBox.vue'
import { createApp, createElementVNode, ComponentInternalInstance } from 'vue'
import { styled } from '@styils/vue'

const DivModal = styled('div', {
  position: 'fixed',
  width: '100%',
  height: '100%',
  left: '0',
  top: '0',
  zIndex: '999',
  backgroundColor: '#00000050',
  display: 'flex',
  flexWrap: 'wrap',
  placeContent: 'center',
})

const DivBox = styled('div', {
  backgroundColor: '#fff',
  color: '#333',
  padding: '10em 20em',
  borderRadius: '10px',
  boxShadow: '0 0 3px #00000080',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const DivText = styled('div', {
  fontSize: '1.5rem',
  marginBottom: '1rem',
})

const Button = styled('button', {
  padding: '0.5rem 1rem',
  backgroundColor: '#5a9cf8',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
})

const MessageBox = {
  props: {
    msg: {
      type: String,
      required: true,
      default: 'Hello World',
    },
  },

  render(ctx: ComponentInternalInstance) {
    return (
      <DivModal>
        <DivBox>
          <DivText>{ctx.props.msg}</DivText>
          <Button class="btn" onClick={() => ctx.emit('onClick')}>
            确定
          </Button>
        </DivBox>
      </DivModal>
    )
  },
}

export default function useDialog(
  msg: string,
  clickHandler: (close: () => void) => void,
) {
  const app = createApp(MessageBox, {
    msg,
    onClick() {
      clickHandler &&
        clickHandler(() => {
          app.unmount()
          div.remove()
        })
    },
  })

  const div = document.createElement('div')
  document.body.appendChild(div)
  app.mount(div)
}
