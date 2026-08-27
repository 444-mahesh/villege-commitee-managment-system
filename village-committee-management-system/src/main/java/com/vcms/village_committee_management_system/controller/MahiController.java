
package com.vcms.village_committee_management_system.controller;

import com.vcms.village_committee_management_system.entity.Committee;
import com.vcms.village_committee_management_system.entity.Complaint;
import com.vcms.village_committee_management_system.entity.Fund;
import com.vcms.village_committee_management_system.entity.Meeting;
import com.vcms.village_committee_management_system.entity.Member;
import com.vcms.village_committee_management_system.entity.Notice;
import com.vcms.village_committee_management_system.entity.User;

import com.vcms.village_committee_management_system.repository.CommitteeRepository;
import com.vcms.village_committee_management_system.repository.ComplaintRepository;
import com.vcms.village_committee_management_system.repository.FundRepository;
import com.vcms.village_committee_management_system.repository.MeetingRepository;
import com.vcms.village_committee_management_system.repository.MemberRepository;
import com.vcms.village_committee_management_system.repository.NoticeRepository;
import com.vcms.village_committee_management_system.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mahi")
@CrossOrigin(origins = "*")
public class MahiController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommitteeRepository committeeRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private NoticeRepository noticeRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private FundRepository fundRepository;


    // =====================================================
    // MAIN MAHI API
    // =====================================================

    @PostMapping("/ask")
    public ResponseEntity<?> askMahi(
            @RequestBody Map<String, String> request) {

        String question = request.get("question");

        if (question == null || question.trim().isEmpty()) {

            return answer(
                    "Please enter a question."
            );
        }

        String text = normalize(question);


        // =================================================
        // GREETING
        // =================================================

        if (
                text.equals("hi") ||
                        text.equals("hello") ||
                        text.equals("hey") ||
                        text.contains("good morning") ||
                        text.contains("good afternoon") ||
                        text.contains("good evening")
        ) {

            return answer(
                    "Hello! 👋 I'm MAHI, your VCMS assistant. "
                            + "I can help you with users, committees, members, "
                            + "complaints, notices, meetings and funds."
            );
        }


        // =================================================
        // WHO IS MAHI
        // =================================================

        if (
                text.contains("who are you") ||
                        text.contains("who is mahi") ||
                        text.contains("what is mahi")
        ) {

            return answer(
                    "I'm MAHI 🤖, the Village Committee Management System "
                            + "assistant. I can provide information from the VCMS database."
            );
        }


        // =================================================
        // WHAT IS VCMS
        // =================================================

        if (
                text.contains("what is vcms") ||
                        text.contains("about vcms") ||
                        text.contains("what does vcms mean") ||
                        text.contains("explain vcms")
        ) {

            return answer(
                    "VCMS stands for Village Committee Management System. "
                            + "It is used to manage village users, committees, members, "
                            + "complaints, notices, meetings and funds."
            );
        }


        // =================================================
        // USER COUNT
        // =================================================

        if (
                containsAny(
                        text,
                        "how many users",
                        "number of users",
                        "total users",
                        "user count",
                        "users registered",
                        "registered users",
                        "how many people registered",
                        "number of registered users"
                )
        ) {

            long count = userRepository.count();

            return answer(
                    "There are currently "
                            + count
                            + " registered users in VCMS."
            );
        }


        // =================================================
        // COMMITTEE COUNT
        // =================================================

        if (
                containsAny(
                        text,
                        "how many committees",
                        "number of committees",
                        "total committees",
                        "committee count",
                        "committees are there",
                        "committees do we have",
                        "how many committee",
                        "number of committee"
                )
        ) {

            long count = committeeRepository.count();

            return answer(
                    "There are currently "
                            + count
                            + " committees in VCMS."
            );
        }


        // =================================================
        // COMMITTEE LIST
        // =================================================

        if (
                containsAny(
                        text,
                        "show committees",
                        "list committees",
                        "committee list",
                        "available committees",
                        "which committees",
                        "what committees",
                        "tell me about committees",
                        "committee details",
                        "display committees"
                )
                        || text.equals("committees")
        ) {

            List<Committee> committees =
                    committeeRepository.findAll();

            if (committees.isEmpty()) {

                return answer(
                        "There are currently no committees in VCMS."
                );
            }

            StringBuilder result =
                    new StringBuilder();

            result.append(
                    "Here are the committees in VCMS:\n\n"
            );

            for (Committee committee : committees) {

                result.append("• ");

                result.append(
                        safe(
                                committee.getCommitteeName()
                        )
                );

                if (
                        committee.getVillageName() != null &&
                                !committee.getVillageName().isBlank()
                ) {

                    result.append(
                            "\n  Village: "
                    );

                    result.append(
                            committee.getVillageName()
                    );
                }

                if (
                        committee.getDescription() != null &&
                                !committee.getDescription().isBlank()
                ) {

                    result.append(
                            "\n  Description: "
                    );

                    result.append(
                            committee.getDescription()
                    );
                }

                if (
                        committee.getCreatedDate() != null
                ) {

                    result.append(
                            "\n  Created: "
                    );

                    result.append(
                            committee.getCreatedDate()
                    );
                }

                result.append("\n\n");
            }

            return answer(
                    result.toString()
            );
        }


        // =================================================
        // MEMBER COUNT
        // =================================================

        if (
                containsAny(
                        text,
                        "how many members",
                        "number of members",
                        "total members",
                        "member count",
                        "members are there",
                        "how many committee members"
                )
        ) {

            long count =
                    memberRepository.count();

            return answer(
                    "There are currently "
                            + count
                            + " committee members in VCMS."
            );
        }


        // =================================================
        // MEMBER LIST
        // =================================================

        if (
                containsAny(
                        text,
                        "show members",
                        "list members",
                        "member list",
                        "who are the members",
                        "committee members",
                        "member details",
                        "display members"
                )
                        || text.equals("members")
        ) {

            List<Member> members =
                    memberRepository.findAll();

            if (members.isEmpty()) {

                return answer(
                        "There are currently no members in VCMS."
                );
            }

            StringBuilder result =
                    new StringBuilder();

            result.append(
                    "Here are the registered committee members:\n\n"
            );

            for (Member member : members) {

                result.append("• ");

                result.append(
                        safe(
                                member.getMemberName()
                        )
                );

                if (
                        member.getRole() != null &&
                                !member.getRole().isBlank()
                ) {

                    result.append(
                            "\n  Role: "
                    );

                    result.append(
                            member.getRole()
                    );
                }

                if (
                        member.getEmail() != null &&
                                !member.getEmail().isBlank()
                ) {

                    result.append(
                            "\n  Email: "
                    );

                    result.append(
                            member.getEmail()
                    );
                }

                if (
                        member.getCommitteeId() != null
                ) {

                    result.append(
                            "\n  Committee ID: "
                    );

                    result.append(
                            member.getCommitteeId()
                    );
                }

                result.append("\n\n");
            }

            return answer(
                    result.toString()
            );
        }


        // =================================================
        // COMPLAINT COUNT
        // =================================================

        if (
                containsAny(
                        text,
                        "how many complaints",
                        "number of complaints",
                        "total complaints",
                        "complaint count",
                        "complaints are there",
                        "how many complaint"
                )
        ) {

            long count =
                    complaintRepository.count();

            return answer(
                    "There are currently "
                            + count
                            + " complaints recorded in VCMS."
            );
        }


        // =================================================
        // COMPLAINT STATUS
        // =================================================

        if (
                containsAny(
                        text,
                        "complaint status",
                        "status of complaints",
                        "complaint statuses",
                        "complaints status",
                        "status for complaints"
                )
        ) {

            return getComplaintStatus();
        }


        // =================================================
        // SHOW COMPLAINTS
        // =================================================

        if (
                containsAny(
                        text,
                        "show complaints",
                        "list complaints",
                        "complaint list",
                        "complaint details",
                        "display complaints",
                        "what complaints",
                        "tell me about complaints"
                )
                        || text.equals("complaints")
        ) {

            List<Complaint> complaints =
                    complaintRepository.findAll();

            if (complaints.isEmpty()) {

                return answer(
                        "There are currently no complaints recorded in VCMS."
                );
            }

            StringBuilder result =
                    new StringBuilder();

            result.append(
                    "Here are the complaints in VCMS:\n\n"
            );

            for (Complaint complaint : complaints) {

                result.append("• ");

                result.append(
                        safe(
                                complaint.getComplaintTitle()
                        )
                );

                if (
                        complaint.getStatus() != null
                ) {

                    result.append(
                            "\n  Status: "
                    );

                    result.append(
                            complaint.getStatus()
                    );
                }

                if (
                        complaint.getPriority() != null
                ) {

                    result.append(
                            "\n  Priority: "
                    );

                    result.append(
                            complaint.getPriority()
                    );
                }

                if (
                        complaint.getCommitteeId() != null
                ) {

                    result.append(
                            "\n  Committee ID: "
                    );

                    result.append(
                            complaint.getCommitteeId()
                    );
                }

                if (
                        complaint.getCreatedDate() != null
                ) {

                    result.append(
                            "\n  Created: "
                    );

                    result.append(
                            complaint.getCreatedDate()
                    );
                }

                result.append("\n\n");
            }

            return answer(
                    result.toString()
            );
        }


        // =================================================
        // NOTICE COUNT
        // =================================================

        if (
                containsAny(
                        text,
                        "how many notices",
                        "number of notices",
                        "total notices",
                        "notice count",
                        "notices are there"
                )
        ) {

            long count =
                    noticeRepository.count();

            return answer(
                    "There are currently "
                            + count
                            + " notices in VCMS."
            );
        }


        // =================================================
        // SHOW NOTICES
        // =================================================

        if (
                containsAny(
                        text,
                        "show notices",
                        "list notices",
                        "notice list",
                        "latest notices",
                        "available notices",
                        "what notices",
                        "notice details",
                        "display notices"
                )
                        || text.equals("notices")
        ) {

            List<Notice> notices =
                    noticeRepository.findAll();

            if (notices.isEmpty()) {

                return answer(
                        "There are currently no notices in VCMS."
                );
            }

            StringBuilder result =
                    new StringBuilder();

            result.append(
                    "Here are the notices in VCMS:\n\n"
            );

            for (Notice notice : notices) {

                result.append("• ");

                result.append(
                        safe(
                                notice.getTitle()
                        )
                );

                if (
                        notice.getCreatedDate() != null
                ) {

                    result.append(
                            "\n  Date: "
                    );

                    result.append(
                            notice.getCreatedDate()
                    );
                }

                if (
                        notice.getPostedBy() != null &&
                                !notice.getPostedBy().isBlank()
                ) {

                    result.append(
                            "\n  Posted by: "
                    );

                    result.append(
                            notice.getPostedBy()
                    );
                }

                if (
                        notice.getMessage() != null &&
                                !notice.getMessage().isBlank()
                ) {

                    result.append(
                            "\n  Message: "
                    );

                    result.append(
                            notice.getMessage()
                    );
                }

                result.append("\n\n");
            }

            return answer(
                    result.toString()
            );
        }


        // =================================================
        // MEETING COUNT
        // =================================================

        if (
                containsAny(
                        text,
                        "how many meetings",
                        "number of meetings",
                        "total meetings",
                        "meeting count",
                        "meetings are there"
                )
        ) {

            long count =
                    meetingRepository.count();

            return answer(
                    "There are currently "
                            + count
                            + " meetings recorded in VCMS."
            );
        }


        // =================================================
        // SHOW MEETINGS
        // =================================================

        if (
                containsAny(
                        text,
                        "show meetings",
                        "list meetings",
                        "meeting list",
                        "upcoming meetings",
                        "available meetings",
                        "what meetings",
                        "meeting details",
                        "display meetings",
                        "when are the meetings"
                )
                        || text.equals("meetings")
        ) {

            List<Meeting> meetings =
                    meetingRepository.findAll();

            if (meetings.isEmpty()) {

                return answer(
                        "There are currently no meetings recorded in VCMS."
                );
            }

            StringBuilder result =
                    new StringBuilder();

            result.append(
                    "Here are the meetings in VCMS:\n\n"
            );

            for (Meeting meeting : meetings) {

                result.append("• ");

                result.append(
                        safe(
                                meeting.getTitle()
                        )
                );

                if (
                        meeting.getMeetingDate() != null
                ) {

                    result.append(
                            "\n  Date: "
                    );

                    result.append(
                            meeting.getMeetingDate()
                    );
                }

                if (
                        meeting.getLocation() != null &&
                                !meeting.getLocation().isBlank()
                ) {

                    result.append(
                            "\n  Location: "
                    );

                    result.append(
                            meeting.getLocation()
                    );
                }

                if (
                        meeting.getAgenda() != null &&
                                !meeting.getAgenda().isBlank()
                ) {

                    result.append(
                            "\n  Agenda: "
                    );

                    result.append(
                            meeting.getAgenda()
                    );
                }

                if (
                        meeting.getOrganizedBy() != null &&
                                !meeting.getOrganizedBy().isBlank()
                ) {

                    result.append(
                            "\n  Organized by: "
                    );

                    result.append(
                            meeting.getOrganizedBy()
                    );
                }

                result.append("\n\n");
            }

            return answer(
                    result.toString()
            );
        }


        // =================================================
        // FUND COUNT
        // =================================================

        if (
                containsAny(
                        text,
                        "how many funds",
                        "number of funds",
                        "fund count",
                        "fund transactions",
                        "how many transactions"
                )
        ) {

            long count =
                    fundRepository.count();

            return answer(
                    "There are currently "
                            + count
                            + " fund transactions recorded in VCMS."
            );
        }


        // =================================================
        // TOTAL FUND AMOUNT
        // =================================================

        if (
                containsAny(
                        text,
                        "total funds",
                        "total fund",
                        "total amount",
                        "total money",
                        "how much money",
                        "how much funds",
                        "fund amount",
                        "total fund amount"
                )
        ) {

            List<Fund> funds =
                    fundRepository.findAll();

            double total = 0.0;

            for (Fund fund : funds) {

                if (fund.getAmount() != null) {

                    total += fund.getAmount();
                }
            }

            return answer(
                    String.format(
                            "The total recorded fund amount is %.2f.",
                            total
                    )
            );
        }


        // =================================================
        // SHOW FUNDS
        // =================================================

        if (
                containsAny(
                        text,
                        "show funds",
                        "list funds",
                        "fund list",
                        "fund details",
                        "display funds",
                        "what funds",
                        "fund transactions"
                )
                        || text.equals("funds")
        ) {

            List<Fund> funds =
                    fundRepository.findAll();

            if (funds.isEmpty()) {

                return answer(
                        "There are currently no fund transactions in VCMS."
                );
            }

            StringBuilder result =
                    new StringBuilder();

            result.append(
                    "Here are the fund transactions in VCMS:\n\n"
            );

            for (Fund fund : funds) {

                result.append("• ");

                result.append(
                        safe(
                                fund.getSource()
                        )
                );

                if (
                        fund.getAmount() != null
                ) {

                    result.append(
                            "\n  Amount: "
                    );

                    result.append(
                            String.format(
                                    "%.2f",
                                    fund.getAmount()
                            )
                    );
                }

                if (
                        fund.getType() != null
                ) {

                    result.append(
                            "\n  Type: "
                    );

                    result.append(
                            fund.getType()
                    );
                }

                if (
                        fund.getDescription() != null &&
                                !fund.getDescription().isBlank()
                ) {

                    result.append(
                            "\n  Description: "
                    );

                    result.append(
                            fund.getDescription()
                    );
                }

                if (
                        fund.getTransactionDate() != null
                ) {

                    result.append(
                            "\n  Date: "
                    );

                    result.append(
                            fund.getTransactionDate()
                    );
                }

                result.append("\n\n");
            }

            return answer(
                    result.toString()
            );
        }


        // =================================================
        // HELP
        // =================================================

        if (
                containsAny(
                        text,
                        "help",
                        "what can you do",
                        "what can mahi do",
                        "mahi help"
                )
        ) {

            return answer(
                    "I can help you with VCMS information.\n\n"
                            + "You can ask me about:\n"
                            + "• Users\n"
                            + "• Committees\n"
                            + "• Members\n"
                            + "• Complaints\n"
                            + "• Notices\n"
                            + "• Meetings\n"
                            + "• Funds\n"
                            + "• General VCMS information\n\n"
                            + "For example, ask: "
                            + "\"How many committees do we have?\""
            );
        }


        // =================================================
        // DEFAULT
        // =================================================

        return answer(
                "I'm MAHI 🤖, your VCMS assistant. "
                        + "I couldn't understand that question yet.\n\n"
                        + "Try asking:\n"
                        + "• How many committees are there?\n"
                        + "• Show committees\n"
                        + "• How many members do we have?\n"
                        + "• Show complaints\n"
                        + "• What is the complaint status?\n"
                        + "• Show notices\n"
                        + "• Show meetings\n"
                        + "• What is the total fund amount?"
        );
    }


    // =====================================================
    // COMPLAINT STATUS HELPER
    // =====================================================

    private ResponseEntity<Map<String, String>>
    getComplaintStatus() {

        List<Complaint> complaints =
                complaintRepository.findAll();

        if (complaints.isEmpty()) {

            return answer(
                    "There are no complaints currently recorded."
            );
        }

        long pending = 0;

        long resolved = 0;

        long other = 0;


        for (Complaint complaint : complaints) {

            String status =
                    complaint.getStatus();

            if (status == null ||
                    status.isBlank()) {

                other++;

                continue;
            }

            String value =
                    status.trim().toLowerCase();


            if (
                    value.contains("pending") ||
                            value.contains("open")
            ) {

                pending++;

            } else if (
                    value.contains("resolved") ||
                            value.contains("completed") ||
                            value.contains("closed")
            ) {

                resolved++;

            } else {

                other++;
            }
        }


        return answer(
                "Complaint status summary:\n\n"
                        + "Pending/Open: "
                        + pending
                        + "\nResolved/Completed/Closed: "
                        + resolved
                        + "\nOther: "
                        + other
        );
    }


    // =====================================================
    // TEXT NORMALIZATION
    // =====================================================

    private String normalize(
            String question) {

        return question
                .trim()
                .toLowerCase()
                .replaceAll("\\s+", " ");
    }


    // =====================================================
    // CHECK MULTIPLE PHRASES
    // =====================================================

    private boolean containsAny(
            String text,
            String... phrases) {

        for (String phrase : phrases) {

            if (text.contains(phrase)) {

                return true;
            }
        }

        return false;
    }


    // =====================================================
    // NULL SAFE STRING
    // =====================================================

    private String safe(
            String value) {

        if (
                value == null ||
                        value.isBlank()
        ) {

            return "Unnamed";
        }

        return value;
    }


    // =====================================================
    // RESPONSE
    // =====================================================

    private ResponseEntity<Map<String, String>>
    answer(String message) {

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "answer",
                message
        );

        return ResponseEntity.ok(
                response
        );
    }
}

