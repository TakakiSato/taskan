require "rails_helper"

RSpec.describe Message, :type => :mailer do
  describe "inviteTeam" do
    let(:mail) { Message.inviteTeam }

    it "renders the headers" do
      expect(mail.subject).to eq("Inviteteam")
      expect(mail.to).to eq(["to@example.org"])
      expect(mail.from).to eq(["from@example.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("Hi")
    end
  end

end
