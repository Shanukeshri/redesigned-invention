import { v4 as uuidv4 } from 'uuid';
export default function generateRequestId() {
  return uuidv4();
}
