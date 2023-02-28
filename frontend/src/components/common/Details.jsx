import React from "react";

import { useSelector, useDispatch } from "react-redux";
import Detail from "src/components/common/detail/Detail";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";
import ModalWindow from "src/components/common/modal/ModalWindow";
import "src/static/form.css";

import { openModal, setText } from "src/store/slices/common/commonSlice";

export default function Details({
  fields,
  data,
  tribe = "update",
  title = "",
  shouldUpdate = null,
  updateField = () => {},
  updateFn = () => {},
  deleteFn = () => {},
  cancelFn = () => {},
  updateImageField = () => {},
}) {
  const language = useSelector((state: RootState) => state.language.language);

  const dispatch = useDispatch();
  const confirmDelete = () => {
    dispatch(openModal("confirm-delete"));
    dispatch(
      setText({
        id: "confirm-delete",
        text: getDisplayText(language, dict.common.confirmDeleteText),
      })
    );
  };

  const deleteFunction = () => {
    if (tribe === "update") confirmDelete();
    else deleteFn();
  };

  return (
    <div className="form-box">
      <h5>{title}</h5>
      <form>
        {fields.map((field, i) => {
          return (
            <Detail
              key={i}
              title={field.title}
              data={data}
              accessor={field.accessor}
              type={field.type}
              updateField={updateField}
              checkState={field.checkState}
              checkFn={field.checkFn}
            />
          );
        })}
      </form>
      <div style={{ width: "100%" }}>
        <button className="button" onClick={updateFn} disabled={!shouldUpdate}>
          {tribe === "update"
            ? getDisplayText(language, dict.common.update)
            : getDisplayText(language, dict.common.add)}
        </button>
        {tribe === "update" ? (
          <button
            className="button"
            onClick={deleteFunction}
            style={{ flow: "right" }}
          >
            {getDisplayText(language, dict.common.delete)}
          </button>
        ) : (
          <></>
        )}
        <button className="button" onClick={cancelFn} style={{ flow: "right" }}>
          {getDisplayText(language, dict.common.cancel)}
        </button>
      </div>
      <ModalWindow
        id="confirm-delete"
        buttonLabel={getDisplayText(language, dict.common.confirmButtonLabel)}
        title={getDisplayText(language, dict.common.confirm)}
        buttonFn={deleteFn}
      />
    </div>
  );
}
