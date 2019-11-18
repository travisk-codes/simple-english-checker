import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

import words from './words'
import './App.css'

const useStyles = makeStyles(theme => ({
	button: {
		width: '14em',
	},
	textarea: {
		marginTop: '24px',
		width: '100%',
		'& div': {
			outline: 'none',
		},
	},
	titleAndBtn: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: '24px',
		alignItems: 'center',
	},
	app: {
		textAlign: 'center',
		width: '90%',
		maxWidth: '38em',
		margin: '0 auto',
		display: 'flex',
		flexDirection: 'column-reverse',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: '1.5em',
	},
	hidden: {
		display: 'none',
	},
	nonEditMode: {
		'& *': {
			borderStyle: 'none',
			color: 'rgba(0, 0, 0, 0.87)',
		},
		'& label': {
			display: 'none',
		},
	},
}))

function colorWords(text) {
	let word_matches = []
	text = text.split(' ')
	text.forEach(word => {
		word_matches.forEach(match => {
			if (match.word === word) return
		})
		let pos = words.indexOf(
			word.toLowerCase().replace(/[^a-zA-Z0-9]/, '')
		)
		word_matches.push({
			word,
			pos,
		})
	})
	let spans = word_matches.map(match => {
		if (match.pos === -1) match.pos = 10000
		let color = `hsla(${(match.pos / 10000) *
			18}, 100%, 50%, ${match.pos / 10000})`
		return (
			<>
				<span style={{ backgroundColor: color }}>
					{match.word}
				</span>
				<span>&nbsp;</span>
			</>
		)
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
				className={`${visibility} ${classes.button}`}
				variant='outlined'
				color='secondary'
				onClick={() => setEditMode(!editMode)}
			>
				{label}
			</Button>
		)
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
				color='secondary'
				className={klasses}
				label='Place prose here'
				multiline
				placeholder='The quick brown fox jumps over the lazy platypus.'
				margin='normal'
				variant='outlined'
				value={user_text}
				disabled={!editMode}
				onChange={e => setUserText(e.target.value)}
				InputProps={{
					tabIndex: '2',
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
			{renderTextarea()}
			<div className={classes.titleAndBtn}>
				<span className={classes.title}>
					{colorWords('Simple English Checker')}
				</span>
				{renderButton()}
			</div>
		</div>
	)
}

export default App
