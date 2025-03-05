

function TermsAndConditions({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#222222] rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto transform transition-all duration-300">
        <div className="p-6">
          <h2 className="text-xl font-light mb-4">CASE PROMOTIONAL TERMS AND CONDITIONS</h2>
          <div className="space-y-4 text-[#999999]">
            <section>
            <p>
                    Purpose and Scope
                    CASEDEEP requires all users participating in the CASE Promotional Plan to agree to the CASE Promotional Terms and Conditions online. These terms apply to all users who meet the CASE certification requirements and may be revised periodically in accordance with the CASE Promotional Terms and Conditions.

                    Obligations of Users
                    </p>
                    <p>
                    1. Respond to client inquiries promptly, ideally within 6 hours, and provide a quotation within 3 business days at the latest.

                    </p>
                    <p>
                    2. If no transaction occurs, CASEDEEP will not charge any promotional fees. For successful transactions, users must remit the applicable promotional commission within 3 business days of receiving the client’s initial payment. In case of order cancellation with sufficient proof, the promotional commission will be fully refunded.

                    </p>
                    <p>
                    3. Avoid delays in promotional commission payments; any delay beyond 3 business days will incur a late fee of 1% per day.

                    </p>
                    <p>
                    4. The service quotes provided by users must include promotional commission to ensure that their original income is not reduced.

                    </p>
                    <p>
                    5. It is strictly prohibited to include information that directs clients to conduct communication or transactions through channels outside the CASEDEEP in chats, calls, profile pages, videos, portfolios, or other platform-related content.

                    </p>
                    <p>
                    6. Users must ensure all materials, works, and services provided are genuine and do not infringe on any third party’s intellectual property rights or other legal rights. In case of infringement, the user will be held accountable, and CASEDEEP reserves the right to terminate the partnership.

                    </p>
                    <p>
                    7. Users must not interfere with the normal operation of the CASEDEEP, including manipulating reviews, falsifying transaction records, or abusing promotional campaigns.

                    </p>
                    <p>
                    8. Users must not disseminate defamatory or malicious statements about CASEDEEP or other users. Violation may result in legal action and termination of the partnership.

                    </p>
                    <p>
                    9. After completing transactions, users are obligated to provide agreed-upon after-sales support. Failure to do so may result in complaints and platform-imposed penalties, including deduction of deposits or reduced credit ratings.

                    </p>

                    <p>
                    Consequences of Violations
                    Violation of any of the above terms will result in CASEDEEP issuing a warning and may lead to the cancellation of the user’s participation in the promotional plan or revocation of CASE certification.</p>
            </section>

            {/* Add more sections as needed */}
          </div>
        </div>
        
        <div className="p-6 bg-[#333333] sticky bottom-0">
          <button
            onClick={onClose}
            className="w-full py-4 bg-[#FFB800] text-black rounded-lg hover:bg-[#FFC833] transition-colors"
          >
            I Understand and Agree
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions; 