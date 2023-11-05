import classNames from 'classnames/bind';
import styles from './SurveyForm.module.scss'
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControlLabel, Icon, IconButton, MenuItem, Radio, Select, Switch, Typography } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { MoreVert } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const cx = classNames.bind(styles);

const SurveyForm = () => {
    const [questions, setQuestion] = useState([
        {
                title: "this is question 1",
                options: [
                    {title: "abc"},
                    {title: "abc2"},
                    {title: "abc3"},
                    {title: "abc4"}
                ],
                type: 'radio',
                required: true,
                open: true
            } 
    ])

    const handleChangeQuestion = (title: string, index: number) => {
        const newQuestion = [...questions];
        newQuestion[index].title = title;
        setQuestion(newQuestion);
        console.log(newQuestion);
        
    }

    const handleChangeOption = (title: string, indexQuestion: number, indexOption: number) => {
        const newQuestionOption = [...questions]
        newQuestionOption[indexQuestion].options[indexOption].title = title;
        setQuestion(newQuestionOption)
    }

    const handleRemoveOption = (indexQuestion: number, indexOption: number) => {
        const removeOption = [...questions]
        if(removeOption[indexQuestion].options.length > 1){
            removeOption[indexQuestion].options.splice(indexOption, 1)
            setQuestion(removeOption)
            console.log(removeOption);
            
        }
    }

    const handleAddOption = (indexQuestion: number) => {
        const newOptionOfQuestion = [...questions]
        if(newOptionOfQuestion[indexQuestion].options.length < 5){
            newOptionOfQuestion[indexQuestion].options.push({title: `Option ${newOptionOfQuestion[indexQuestion].options.length + 1}`})
            setQuestion(newOptionOfQuestion)
            console.log(newOptionOfQuestion);
            
        }else{
            console.log("Max 5 options");
        }
    }

    const handleCopyQuestion = (indexQuestion: number) => {
        const copiedQuestion = [...questions]
        const newQuestion = copiedQuestion[indexQuestion]
        setQuestion([...questions, newQuestion])
    }

    const handleDeleteQuestion = (indexQuestion: number) => {
        const question = [...questions]
        if(questions.length > 1){
            question.splice(indexQuestion, 1)
            setQuestion(question)
        }
    }


    

    

    const questionUI = () =>{
        return questions.map((question, i) => {
            return (
            <Accordion key={i} expanded={true} className={cx({ 
                add_border: question.open 
            })}>
                <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'  style={{width: '100%'}}>
                   
                    {/* {!questions[i].open ? (

                        <div className={cx('saved_question')}>

                            <Typography sx={{ fontSize: "15px", fontWeight: "400", letterSpacing: ".1px", lineHeight: "24px", paddingBottom: "8px" }}>
                                {i+1}. {questions[i].title}</Typography>
                                
                                {question.options.map((option, i) => (
                                    <div key={i}>
                                        <div style={{display: "flex"}}>
                                            <FormControlLabel sx={{marginLeft: "5px", marginBottom: "5px"}} disabled control={<input type={question.type} color='primary' style={{marginRight: "3px"}} required={question.required}/>}
                                            label={
                                                <Typography sx={{
                                                    fontSize: "13px",
                                                    fontWeight: '400',
                                                    letterSpacing: '.2px',
                                                    lineHeight: "20px",
                                                    color: "#202124"
                                                }}
                                                >{question.options[i].option}</Typography>
                                            }/>
                                        </div>
                                    </div>
                                ))} 
                            {question.option}
                        </div>
                    ) : ""} */}


                </AccordionSummary>
                
                    <div className={cx('question-boxes')}>
                        <AccordionDetails className={cx('add-question')}>
                            <div className={cx('add-question-top')}>
                                <input onChange={(e) => handleChangeQuestion(e.target.value, i)} type='text' className={cx('question')} placeholder='Question' value={question.title}/>
                                <Select className={cx('select')} style={{ color: "#5f6368", fontSize: "13px" }}>
                                    <MenuItem id='radio' value='Radio'><Radio style={{marginRight: "10px", color: "#70757a"}}/>Multiple Choice</MenuItem>
                                </Select>
                            </div>
                        {/* </AccordionDetails>
                    </div> */}

                    
                
                        {question.options.map((option, j) => (
                            <div className={cx('add-question-body')} key={j}>
                                <input type='radio' style={{marginRight: "10px"}}/>
                                <div>
                                    <input onChange={(e) => handleChangeOption(e.target.value, i ,j)} type='text' className={cx('text-input')} placeholder='option' value={option.title}/>
                                </div>
                                <IconButton aria-label='delete'>
                                    <CloseIcon onClick={() => handleRemoveOption(i, j)}/>
                                </IconButton>
                            </div>
                        ))}

                        {question.options.length < 5 && (
                            <div className='add-question-body'>
                                    <Button onClick={() => handleAddOption(i)} size='small' style={{textTransform: "none", color: "#4285f4", fontSize: "13px", fontWeight: "600"}}>Add Option</Button>
                                </div>
                                
                        )}

                        <div className={cx('add-footer')}>
                            <div className={cx('add-question-bottom-left')}>
                                <Button size='small' sx={{textTransform: 'none', color: "#4285f4", fontSize: "13px", fontWeight: "600"}}>
                                    Answer key
                                </Button>
                            </div>

                            <div className={cx('add-question-bottom')}>
                                <IconButton>
                                    <ContentCopyIcon onClick={() => handleCopyQuestion(i)}/>
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon onClick={() => handleDeleteQuestion(i)}/>
                                </IconButton>
                                <IconButton>
                                    <span style={{color: "#5f6368", fontSize: "13px"}}>Required</span>
                                    <Switch name='checkedA' color='primary' />
                                </IconButton>
                                <IconButton>
                                    <MoreVert/>
                                </IconButton>
                            </div>
                        </div>
                        </AccordionDetails>
                    
                    </div>
                
            </Accordion>
         ) })
    }


  return (
    <div>
    <div className={cx('survey-form')}>
        <br/>
        <div className={cx('section')}>
            <div className={cx('survey-title-section')}>
                <div className={cx('survey-form-top')}>
                    <input className={cx('survey-form-title')} placeholder='Untitled document' type='text' />
                    <input className={cx('survey-form-desc')} placeholder='Form description' type='text' />
                </div>
            </div>
            {questionUI()}
        </div>
    </div>
    </div>
  )
}

export default SurveyForm