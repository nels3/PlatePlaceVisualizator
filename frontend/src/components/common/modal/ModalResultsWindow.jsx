import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "src/components/common/Table";
import Modal from "react-modal";
import { ModalState } from "src/utils/constants";
import { closeModal } from "src/store/slices/common/commonSlice";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";
import "src/static/modal.css";

const customStyles = {
  content: {
    top: "25%",
    left: "5%",
    right: "auto",
    bottom: "auto",
    width: "90%",
    marginRight: "-10%",
  },
};

export default function ModalResultsWindow({
  id,
  buttonLabel = "",
  buttonFn = () => {},
  title = "",
  columns = [],
  data = {},
  onRowClickAction = () => {},
  selectedRowIndex = null,
  loadingState = null,
}) {
  const state = useSelector((state: RootState) => state.common.modalState[id]);
  const text = useSelector((state: RootState) => state.common.modalText[id]);
  const language = useSelector((state: RootState) => state.language.language);

  const dispatch = useDispatch();
  const closeModalFn = () => {
    dispatch(closeModal(id));
  };

  const confirmFn = () => {
    dispatch(closeModal(id));
    buttonFn();
  };

  return (
    <Modal
      isOpen={state === ModalState.open}
      onRequestClose={closeModalFn}
      style={customStyles}
      ariaHideApp={false}
    >
      <h2> {title}</h2>
      <div style={{ padding: "10px" }}>{text}</div>
      <Table
        columns={columns}
        data={data}
        onClickAction={onRowClickAction}
        selectedRowIndex={selectedRowIndex}
        loadingState={loadingState}
      />
      <button
        onClick={confirmFn}
        className="button-modal"
        style={{ margin: "10px" }}
      >
        {buttonLabel}
      </button>
      <button
        onClick={closeModalFn}
        className="button-modal"
        style={{ margin: "10px" }}
      >
        {getDisplayText(language, dict.common.back)}
      </button>
    </Modal>
  );
}
