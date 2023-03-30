import {useState, useEffect} from 'react';
import {Col} from 'react-bootstrap';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

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
    <div style={{height: 'calc(100% - 175px)', overflow: 'scroll', background: 'white'}}>
      {/* {status !== 'success' ? <h2>success message</h2> : null} */}
      <div style={{width: '100%', marginTop: '10px'}}>
        <h3 className="yours messages">
          <div className="message">
            Show some support for Tay, Shoot him a message here
          </div>
        </h3>
      </div>
      {submitted && (
        <div style={{width: '100%'}}>
          <h3 className="mine messages">
            <div className="message">{submitted}</div>
          </h3>
        </div>
      )}
      {status === 'success' && (
        <div style={{width: '100%'}}>
          <h3 className="messanger-contact">
            <div className="message">
              Your message has been succesfully sent! Thank you!
            </div>
          </h3>
        </div>
      )}
      {status === 'error' && (
        <div style={{width: '100%'}}>
          <h3 className="yours messages">
            <div className="message">
              We're sorry your message was not able to send. Please refresh the page and try again
            </div>
          </h3>
        </div>
      )}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          setSubmitted(messageTay);
        }}
        className="message-form-div"
      >
        {/* {status === 'error' && (
          <div className="home-text">Please try again later</div>
        )} */}
        {/* {status !== 'success' ? (
          <>
            <div className="inputTextStyling">
              <InputField
                label="Name"
                onChangeHandler={setName}
                type="name"
                value={name}
                isRequired
                placeholder="Your Name"
              />
            </div>
            <div className="inputTextStyling">
              <InputField
                label="Email"
                onChangeHandler={setEmail}
                type="email"
                value={email}
                placeholder="Your Email"
                isRequired
              />
            </div>
          </>
        ) : null} */}
        {/* {status !== 'success' ? (
          <div style={{width: '100%', textAlign: 'right', right: 0}}>
            {status === 'sending' ? (
              <div className="home-text">sending...</div>
            ) : (
              <Col lg={2}>
                <InputField label="enter" type="submit" formValues={[email]} />
              </Col>
            )}
          </div>
        ) : (
          <div className="home-text">we will talk soon.</div>
        )} */}
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
            formValues={[email, messageTay]}
          />
        </Col>
      </form>
    </div>
  );
};

const MailchimpForm = () => {
  const url = `https://gmail.us10.list-manage.com/subscribe/post?u=f44c41b585cf2ea8136952a5f&amp;id=b1506a89aa&amp;`;

  return (
    <div className="formDiv">
      <MailchimpSubscribe
        url={url}
        render={({subscribe, status, message}) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />
    </div>
  );
};

export default MailchimpForm;
