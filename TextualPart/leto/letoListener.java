// Generated from leto.g4 by ANTLR 4.9
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link letoParser}.
 */
public interface letoListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link letoParser#prog}.
	 * @param ctx the parse tree
	 */
	void enterProg(letoParser.ProgContext ctx);
	/**
	 * Exit a parse tree produced by {@link letoParser#prog}.
	 * @param ctx the parse tree
	 */
	void exitProg(letoParser.ProgContext ctx);
	/**
	 * Enter a parse tree produced by {@link letoParser#instruction}.
	 * @param ctx the parse tree
	 */
	void enterInstruction(letoParser.InstructionContext ctx);
	/**
	 * Exit a parse tree produced by {@link letoParser#instruction}.
	 * @param ctx the parse tree
	 */
	void exitInstruction(letoParser.InstructionContext ctx);
	/**
	 * Enter a parse tree produced by {@link letoParser#definition}.
	 * @param ctx the parse tree
	 */
	void enterDefinition(letoParser.DefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link letoParser#definition}.
	 * @param ctx the parse tree
	 */
	void exitDefinition(letoParser.DefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link letoParser#instantiation}.
	 * @param ctx the parse tree
	 */
	void enterInstantiation(letoParser.InstantiationContext ctx);
	/**
	 * Exit a parse tree produced by {@link letoParser#instantiation}.
	 * @param ctx the parse tree
	 */
	void exitInstantiation(letoParser.InstantiationContext ctx);
	/**
	 * Enter a parse tree produced by {@link letoParser#node_type}.
	 * @param ctx the parse tree
	 */
	void enterNode_type(letoParser.Node_typeContext ctx);
	/**
	 * Exit a parse tree produced by {@link letoParser#node_type}.
	 * @param ctx the parse tree
	 */
	void exitNode_type(letoParser.Node_typeContext ctx);
	/**
	 * Enter a parse tree produced by {@link letoParser#relationship_type}.
	 * @param ctx the parse tree
	 */
	void enterRelationship_type(letoParser.Relationship_typeContext ctx);
	/**
	 * Exit a parse tree produced by {@link letoParser#relationship_type}.
	 * @param ctx the parse tree
	 */
	void exitRelationship_type(letoParser.Relationship_typeContext ctx);
	/**
	 * Enter a parse tree produced by {@link letoParser#node}.
	 * @param ctx the parse tree
	 */
	void enterNode(letoParser.NodeContext ctx);
	/**
	 * Exit a parse tree produced by {@link letoParser#node}.
	 * @param ctx the parse tree
	 */
	void exitNode(letoParser.NodeContext ctx);
	/**
	 * Enter a parse tree produced by {@link letoParser#relationship}.
	 * @param ctx the parse tree
	 */
	void enterRelationship(letoParser.RelationshipContext ctx);
	/**
	 * Exit a parse tree produced by {@link letoParser#relationship}.
	 * @param ctx the parse tree
	 */
	void exitRelationship(letoParser.RelationshipContext ctx);
	/**
	 * Enter a parse tree produced by {@link letoParser#number}.
	 * @param ctx the parse tree
	 */
	void enterNumber(letoParser.NumberContext ctx);
	/**
	 * Exit a parse tree produced by {@link letoParser#number}.
	 * @param ctx the parse tree
	 */
	void exitNumber(letoParser.NumberContext ctx);
	/**
	 * Enter a parse tree produced by {@link letoParser#comment}.
	 * @param ctx the parse tree
	 */
	void enterComment(letoParser.CommentContext ctx);
	/**
	 * Exit a parse tree produced by {@link letoParser#comment}.
	 * @param ctx the parse tree
	 */
	void exitComment(letoParser.CommentContext ctx);
	/**
	 * Enter a parse tree produced by {@link letoParser#id}.
	 * @param ctx the parse tree
	 */
	void enterId(letoParser.IdContext ctx);
	/**
	 * Exit a parse tree produced by {@link letoParser#id}.
	 * @param ctx the parse tree
	 */
	void exitId(letoParser.IdContext ctx);
	/**
	 * Enter a parse tree produced by {@link letoParser#componant}.
	 * @param ctx the parse tree
	 */
	void enterComponant(letoParser.ComponantContext ctx);
	/**
	 * Exit a parse tree produced by {@link letoParser#componant}.
	 * @param ctx the parse tree
	 */
	void exitComponant(letoParser.ComponantContext ctx);
}