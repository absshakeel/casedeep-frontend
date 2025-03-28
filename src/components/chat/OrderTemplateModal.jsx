import { Button, Col, Modal, ModalBody, Row } from "reactstrap";
import { dummyOrderTemplates } from "../../dummyData";
import OrderNowCard from "../cards/OrderNowCard";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../services/userServices";
const OrderTemplateModal = ({ isOpen, toggle }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/api/categories");
        setCategories(res.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    // fetchCategories();
  }, []);

  return (
    <Modal isOpen={isOpen} size="xl" toggle={toggle} centered>
      <ModalBody>
        <div className="d-flex align-items-center justify-content-between p-2">
          <h5 className="color-7777">Select from Templates</h5>
          <Button
            onClick={() => toggle()}
            className="border-none color-7777 bg-transparent "
          >
            <RxCross2 size={20} />
          </Button>
        </div>
        <Row className="mt-3 g-2 g-md-1">
          {dummyOrderTemplates?.map((item, key) => (
            <Col
              key={key}
              md={6}
              xl={4}
              onClick={() => {
                setSelectedCat(item);
                toggle();
              }}
            >
              <OrderNowCard details={item} />
            </Col>
          ))}
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default OrderTemplateModal;
