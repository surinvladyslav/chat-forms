import { actions } from "../store/reducers";
import { useContext } from "../store/context";
import { useEffect } from "react";

export const useCopyToClipboard = (textToCopy, copy, setCopied) => {
    const { dispatch } = useContext()

    useEffect(() => {
       const copyToClipboard = () => {
           if (navigator.clipboard && window.isSecureContext) {
               dispatch({
                   type: actions.ALERT,
                   payload: {
                       active: true,
                       type: 'success',
                       message: 'Copied!'
                   }
               });
               setCopied(false)
               return navigator.clipboard.writeText(textToCopy);
           }
           let textArea = document.createElement("textarea");
           textArea.value = textToCopy;
           textArea.style.position = "fixed";
           textArea.style.left = "-999999px";
           textArea.style.top = "-999999px";
           document.body.appendChild(textArea);
           textArea.focus();
           textArea.select();
           return new Promise((res, rej) => {
               setCopied(false)
               document.execCommand('copy') ? res() : rej();
               !res() ?
               dispatch({
                   type: actions.ALERT,
                   payload: {
                       active: true,
                       type: 'success',
                       message: 'Copied!'
                   }
               }) :
               dispatch({
                   type: actions.ALERT,
                   payload: {
                       active: true,
                       type: 'error',
                       message: 'Something went wrong!'
                   }
               });
               textArea.remove();
           });
       }
       if (copy) {
           copyToClipboard();
       }
    }, [copy])
}