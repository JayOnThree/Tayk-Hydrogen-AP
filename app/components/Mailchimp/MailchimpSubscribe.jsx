import {useState, useEffect} from 'react';
import {Col} from 'react-bootstrap';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import {motion} from 'framer-motion';

import InputField from './InputField';

const CustomForm = ({status, onValidated}) => {
  //   const [email, setEmail] = useState('');
  const [email, setEmail] = useState('');
  const [messageTay, setMessageTay] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
    if (status === 'success') clearFields();
  }, [status]);
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
      {status === 'success' && (
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
      {status === 'error' && (
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
      )}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          setSubmitted(messageTay);
        }}
        className="message-form-div"
      >
        <Col lg={{span: 8, offset: 2}} xs={8}>
          <InputField
            label="Email"
            onChangeHandler={setEmail}
            type="email"
            value={email}
            isRequired
            placeholder="Your Email"
          />
          <InputField
            label="Message"
            onChangeHandler={setMessageTay}
            type="message"
            value={messageTay}
            placeholder="Your Message"
            isRequired
          />
        </Col>
        <Col lg={2} xs={4}>
          <InputField
            label="enter"
            type="submit"
            alt="Submit"
            submitted={submitted}
            formValues={[email, messageTay]}
          />
        </Col>
      </form>
    </div>
  );
};

const MailchimpForm = () => {
  return (
    <div className="formDiv">
      <CustomForm
        status={status}
        // message={message}
        // onValidated={(formData) => subscribe(formData)}
      />
    </div>
  );
};

export default MailchimpForm;
