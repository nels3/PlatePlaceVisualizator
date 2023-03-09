import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ModalWindow from "src/components/common/modal/ModalWindow";
import Modal from "react-modal";

import {
  openModal,
  closeModal,
  setText,
} from "src/store/slices/common/commonSlice";

import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";
import { ErrorState } from "src/utils/constants";

export default function ErrorHandler({
  status,
  setStatus,
  modalId,
  modalText,
  buttonFn = () => {},
}) {
  const language = useSelector((state) => state.language.language);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === ErrorState.error) {
      dispatch(openModal(modalId));
      dispatch(
        setText({
          id: modalId,
          text: modalText,
        })
      );
      dispatch(setStatus(ErrorState.correct));
    }
  }, [status]);

  const buttonFunction = () => {
    dispatch(closeModal(modalId));
    dispatch(setText({ id: modalId, text: "" }));
    buttonFn();
  };

  return (
    <ModalWindow
      id={modalId}
      buttonLabel={getDisplayText(language, dict.common.confirmExitButtonLabel)}
      title={getDisplayText(language, dict.common.error)}
      buttonFn={buttonFunction}
    />
  );
}
