package com.example.HealthCare.service;

import com.example.HealthCare.model.Member;

import java.util.List;

public interface MemberService {
    Member addMember(Member member);

    Member updateMember(Member member);

    void deleteMember(Integer memberID);

    Member getMemberById(Integer memberID);

    List<Member> getAllMembers();
}
