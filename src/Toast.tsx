import { observer } from 'mobx-react';
import { Alert } from 'react-bootstrap';

const Toast: React.FC<any> = observer(({ store }) => {
  return (
    <div className='custom-toast'>
      {store.message ? (
        <Alert variant={store.type === 'success' ? 'success' : 'danger'}>
          {store.message}
        </Alert>
      ) : (
        ''
      )}
    </div>
  );
});

export default Toast;
