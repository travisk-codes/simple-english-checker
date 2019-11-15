import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

import words from './words'
import './App.css'


const useStyles = makeStyles(theme => ({
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
    }
  }
}))

function colorWords(text) {
	let word_matches = []
	let COLOR
	text = text.split(' ')
	text.forEach(word => {
		word_matches.forEach(match => {
			if (match.word == word) return
		})
		let pos = words.indexOf(word)
		word_matches.push({
			word,
			pos
		})
	})
	let spans = word_matches.forEach(match => (
		<span style={{backgroundColor: COLOR}}>{match.word}</span>
	))
	return spans
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
        className={visibility}
        variant="outlined"
				color="primary"
				onClick={() => setEditMode(!editMode)}
      >
        {label}
      </Button>
    );
	}

	function renderTextarea() {
		let spans
		let klasses = editMode ? classes.textarea : `${classes.textarea} ${classes.nonEditMode}`
		if (!editMode) {
			spans = colorWords(user_text)
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
      />
    );
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
