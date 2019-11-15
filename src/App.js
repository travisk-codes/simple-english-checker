import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

import words from './words'
import './App.css'


const useStyles = makeStyles(theme => ({
  button: {
    width: '16em'
  },
  textarea: {
    width: "100%"
  },
  titleAndBtn: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    height: "2em",
    marginTop: "32px"
  },
  app: {
    textAlign: "center",
    width: "90%",
    maxWidth: "38em",
    margin: "0 auto"
  },
  title: {
    fontSize: "1.5em"
  },
  hidden: {
    display: "none"
  },
  nonEditMode: {
    "& *": {
      borderStyle: "none",
      color: "rgba(0, 0, 0, 0.87)",
    },
    "& label": {
      display: "none"
    },
  }
}))

function colorWords(text) {
  let word_matches = []
  let original = text.split(' ')
  let lowercase = text.toLowerCase().split(' ')
	lowercase.forEach(word => {
		word_matches.forEach(match => {
      if (match.word === word) return
		})
    let pos = words.indexOf(word)
		word_matches.push({
			word: original[lowercase.indexOf(word)],
			pos
		})
  })
	let spans = word_matches.map(match => {
    if (match.pos === -1) match.pos = 10000
    let color = `rgba(255, 0, 0, ${match.pos / 10000})`
		return (<><span style={{backgroundColor: color}}>{match.word}</span><span>&nbsp;</span></>)
  })
	return spans || <span>error</span>
}

function App() {
	const classes = useStyles()
	const [user_text, setUserText] = useState('')
	const [editMode, setEditMode] = useState(true)

	function renderButton() {
		let visibility = !user_text ? classes.hidden : null
		let label = editMode ? 'how simple is it?' : 'edit text'
		return (
      <Button
        className={`${classes.visibility} ${classes.button}`}
        variant="outlined"
				color="primary"
				onClick={() => setEditMode(!editMode)}
      >
        {label}
      </Button>
    );
	}

	function renderTextarea() {
		let element, klasses
    if (editMode) {
      element = 'input'
      klasses = classes.textarea
		} else {
      element = () => colorWords(user_text)
      klasses = `${classes.textarea} ${classes.nonEditMode}`
    }
		return (
      <TextField
        className={klasses}
        label="Place prose here"
        multiline
        placeholder="The quick brown fox jumps over the lazy platypus."
        margin="normal"
        variant="outlined"
				value={user_text}
				disabled={!editMode}
        onChange={e => setUserText(e.target.value)}
        InputProps={{
          inputComponent: element,
          style: {
            display: 'flex',
            flexWrap: 'wrap',
          },
        }}
      />
    )
	}

	return (
		<div className={classes.app}>
			<div className={classes.titleAndBtn}>
				<span className={classes.title}>Simple English Checker</span>
				{renderButton()}
			</div>
			{renderTextarea()}
		</div>
	);
}

export default App;
