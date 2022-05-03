const styles = {
  text: {
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: '700',
    color: 'text',
  },
  row: {
    backgroundColor: 'white3',
    width: '100%',
    padding: '6px 10px',
    justifyContent: 'space-between',
    '&:first-child': {
      borderRadius: '6px 6px 0 0',
    },
    '&:last-child': {
      borderRadius: '0 0 6px 6px',
    },
    '&:nth-child(2)': {
      background: 'white4',
    },
  },
  button: {
    '&&': {
      fontSize: '16px',
      fontWeight: 700,
      padding: '10px 32px',
    },
  },
}

export default styles
