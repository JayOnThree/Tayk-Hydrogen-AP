/* eslint-disable jsx-a11y/alt-text */
import {useState, useEffect} from 'react';
import {Col} from 'react-bootstrap';
import {motion} from 'framer-motion';

const CustomForm = ({status, onValidated}) => {
  //   const [email, setEmail] = useState('');
  const [email, setEmail] = useState('');
  const [messageTay, setMessageTay] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // const [status, setStatus] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
      email.indexOf('@') > -1 &&
      onValidated({
        MERGE0: email,
        MERGE1: messageTay,
      });
  };

  useEffect(() => {
    if (submitted) clearFields();
  }, [submitted]);
  const clearFields = () => {
    setEmail('');
    setMessageTay('');
  };

  return (
    <div
      style={{
        height: 'calc(70vh - 175px)',
        overflow: 'scroll',
      }}
    >
      {/* {status !== 'success' ? <h2>success message</h2> : null} */}
      <div style={{width: '100%', marginTop: '10px'}}>
        <h3 className="yours messages">
          <div className="message">
            Show some support for Tay, Shoot him a message here
          </div>
        </h3>
      </div>
      {submitted && (
        <motion.div
          style={{width: '100%'}}
          animate={{
            marginTop: submitted ? 0 : 100,
            opacity: submitted ? 1 : 0,
          }}
        >
          <h3 className="mine messages">
            <div className="message">{submitted}</div>
          </h3>
        </motion.div>
      )}
      {submitted && (
        <motion.div
          style={{width: '100%'}}
          initial={{marginTop: -100, opacity: 0}}
          animate={{marginTop: 0, opacity: 1}}
          exit={{marginTop: -100, opacity: 0}}
        >
          <h3 className="yours messages">
            <div className="message">
              Your message has been succesfully sent! Thank you!
            </div>
          </h3>
        </motion.div>
      )}
      {/* {status === 'error' && (
        <motion.div
          style={{width: '100%'}}
          animate={{
            marginTop: status === 'error' ? 0 : 100,
            opacity: status === 'error' ? 1 : 0,
          }}
        >
          <h3 className="yours messages">
            <div className="message">
              We're sorry, your message was not able to send. Please try again.
            </div>
          </h3>
        </motion.div>
      )} */}
      <form
        className="message-form-div"
        action="https://submit-form.com/DYbEBFRQ"
      >
        <Col lg={{span: 8, offset: 2}} xs={8}>
          {/* <input type="hidden" name="_append" value="false" />
          <input type="hidden" name="_redirect" value="" /> */}
          <input
            type="email"
            id="name"
            name="name"
            placeholder="Name"
            required=""
            className="message-input"
          />
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            required=""
            className="message-textarea"
          />
        </Col>
        <Col lg={2} xs={4}>
          <button className="enter-button" type="submit">
            <img src="/send.svg" style={{width: '100%'}} />
          </button>
          {/* <input
            className="enter-button"
            type="image"
            src="/send.svg"
            style={{
              filter: validateInput(props.formValues)
                ? 'grayscale(100%)'
                : 'grayscale(0%)',
            }}
            disabled={validateInput(props.formValues)}
          /> */}
        </Col>
      </form>
    </div>
  );
};

const MessageForm = () => {
  return (
    <div className="formDiv">
      <CustomForm />
    </div>
  );
};

export default MessageForm;
